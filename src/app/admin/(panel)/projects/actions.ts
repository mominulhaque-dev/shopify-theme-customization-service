"use server";

import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/auth";
import { str } from "@/lib/admin/content";
import { DEFAULT_MILESTONES, MILESTONE_STATUSES, PROJECT_STATUSES } from "@/lib/admin/projects";
import { canEmailCustomers, idempotencyKey, isEmail, resendClient, sender } from "@/lib/email";
import { siteConfig } from "@/data/site";

export type ProjectState = { ok?: string; error?: string };

const paths = (id: string) => {
  revalidatePath("/admin/projects/");
  revalidatePath(`/admin/projects/${id}/`);
  revalidatePath("/admin/");
};

function projectFields(fd: FormData) {
  const status = str(fd, "status");
  const email = str(fd, "client_email", 320);
  return {
    title: str(fd, "title", 200),
    client_name: str(fd, "client_name", 160),
    client_email: email && isEmail(email) ? email.toLowerCase() : "",
    store_url: str(fd, "store_url", 500),
    status: PROJECT_STATUSES.includes(status as never) ? status : "active",
    message: str(fd, "message", 4000),
  };
}

export async function createProject(_prev: ProjectState, fd: FormData): Promise<ProjectState> {
  const { supabase } = await requireAdmin();
  const row = projectFields(fd);
  if (!row.title) return { error: "Give the project a name." };
  const leadId = str(fd, "lead_id", 64) || null;

  const { data, error } = await supabase
    .from("projects")
    .insert({ ...row, lead_id: leadId })
    .select("id")
    .single();
  if (error) return { error: error.message };
  const id = (data as { id: string }).id;

  if (fd.get("default_milestones") === "on") {
    await supabase.from("project_milestones").insert(DEFAULT_MILESTONES.map((title, i) => ({ project_id: id, title, sort: i, status: i === 0 ? "done" : "todo", done_at: i === 0 ? new Date().toISOString() : null })));
  }
  if (leadId) {
    await supabase.from("leads").update({ status: "won" }).eq("id", leadId).in("status", ["new", "contacted", "quoted"]);
    revalidatePath(`/admin/leads/${leadId}/`);
    revalidatePath("/admin/leads/");
  }
  paths(id);
  redirect(`/admin/projects/${id}/`);
}

export async function updateProject(id: string, _prev: ProjectState, fd: FormData): Promise<ProjectState> {
  const { supabase } = await requireAdmin();
  const row = projectFields(fd);
  if (!row.title) return { error: "Give the project a name." };
  const { data, error } = await supabase.from("projects").update(row).eq("id", id).select("token").single();
  if (error) return { error: error.message };
  paths(id);
  revalidatePath(`/portal/${(data as { token: string }).token}/`);
  return { ok: "Saved. The client page is updated." };
}

export async function deleteProject(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects/");
  revalidatePath("/admin/");
  redirect("/admin/projects/");
}

export async function regenerateToken(id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("projects").update({ token: randomBytes(18).toString("hex") }).eq("id", id);
  paths(id);
}

/* ---------------------------------------------------------- milestones --- */

export async function addMilestone(projectId: string, fd: FormData) {
  const { supabase } = await requireAdmin();
  const title = str(fd, "title", 200);
  if (!title) return;
  const { data } = await supabase.from("project_milestones").select("sort").eq("project_id", projectId).order("sort", { ascending: false }).limit(1);
  const next = ((data as { sort: number }[] | null)?.[0]?.sort ?? -1) + 1;
  await supabase.from("project_milestones").insert({ project_id: projectId, title, sort: next, due_date: str(fd, "due_date") || null });
  await touch(supabase, projectId);
}

export async function updateMilestone(projectId: string, id: string, fd: FormData) {
  const { supabase } = await requireAdmin();
  const status = str(fd, "status");
  const title = str(fd, "title", 200);
  const due = str(fd, "due_date");
  const patch: Record<string, unknown> = {
    status: MILESTONE_STATUSES.includes(status as never) ? status : "todo",
    due_date: /^\d{4}-\d{2}-\d{2}$/.test(due) ? due : null,
  };
  if (title) patch.title = title;
  patch.done_at = patch.status === "done" ? new Date().toISOString() : null;
  const { data: cur } = await supabase.from("project_milestones").select("status, done_at").eq("id", id).maybeSingle();
  const c = cur as { status: string; done_at: string | null } | null;
  if (c?.status === "done" && patch.status === "done") patch.done_at = c.done_at; // keep the original date
  await supabase.from("project_milestones").update(patch).eq("id", id).eq("project_id", projectId);
  await touch(supabase, projectId);
}

export async function moveMilestone(projectId: string, id: string, dir: -1 | 1) {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("project_milestones").select("id, sort").eq("project_id", projectId).order("sort");
  const list = ((data as { id: string; sort: number }[] | null) ?? []).map((m) => m.id);
  const i = list.indexOf(id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j]!, list[i]!];
  await Promise.all(list.map((mid, sort) => supabase.from("project_milestones").update({ sort }).eq("id", mid)));
  await touch(supabase, projectId);
}

export async function deleteMilestone(projectId: string, id: string) {
  const { supabase } = await requireAdmin();
  await supabase.from("project_milestones").delete().eq("id", id).eq("project_id", projectId);
  await touch(supabase, projectId);
}

/** Bumps updated_at (shown on the client page) and refreshes both views. */
async function touch(supabase: Awaited<ReturnType<typeof requireAdmin>>["supabase"], projectId: string) {
  const { data } = await supabase.from("projects").update({ updated_at: new Date().toISOString() }).eq("id", projectId).select("token").single();
  paths(projectId);
  if (data) revalidatePath(`/portal/${(data as { token: string }).token}/`);
}

/* --------------------------------------------------------- email link --- */

export async function emailPortalLink(id: string, _prev: ProjectState): Promise<ProjectState> {
  const { supabase } = await requireAdmin();
  const { data } = await supabase.from("projects").select("title, client_name, client_email, token").eq("id", id).maybeSingle();
  const p = data as { title: string; client_name: string; client_email: string; token: string } | null;
  if (!p) return { error: "Project not found." };
  if (!p.client_email) return { error: "Add the client's email first." };
  const resend = resendClient();
  if (!resend || !canEmailCustomers()) {
    return { error: "Emailing clients needs a verified sending domain in Resend (RESEND_FROM). Copy the link and send it yourself for now." };
  }
  const url = `${siteConfig.url}/portal/${p.token}/`;
  const hi = p.client_name ? `Hi ${p.client_name.split(" ")[0]},` : "Hi,";
  const { error } = await resend.emails.send(
    {
      from: sender(),
      to: p.client_email,
      replyTo: process.env.CONTACT_EMAIL,
      subject: `Track your project: ${p.title}`,
      text: `${hi}\n\nYou can follow the progress of "${p.title}" at any time here:\n${url}\n\nThe page updates as each step is finished. Just reply to this email if you have a question.\n\n— ${siteConfig.name}`,
      html: `<p>${esc(hi)}</p><p>You can follow the progress of <strong>${esc(p.title)}</strong> at any time here:</p><p><a href="${url}">${url}</a></p><p>The page updates as each step is finished. Just reply to this email if you have a question.</p><p>— ${esc(siteConfig.name)}</p>`,
    },
    { idempotencyKey: idempotencyKey("portal-link", id, p.token, p.client_email) },
  );
  if (error) return { error: error.message };
  return { ok: `Sent to ${p.client_email}.` };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
