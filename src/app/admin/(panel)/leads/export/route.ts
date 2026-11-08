import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { LEAD_STATUSES, safeSearch, toCsv } from "@/lib/admin/format";

export const dynamic = "force-dynamic";

const COLUMNS = [
  "created_at",
  "name",
  "email",
  "store_url",
  "service",
  "budget",
  "status",
  "message",
  "notes",
  "source_page",
  "referrer",
  "contacted_at",
];

/** CSV of the leads matching the same filters as the list page. */
export async function GET(request: Request) {
  const { supabase } = await requireAdmin();
  const sp = new URL(request.url).searchParams;
  const q = safeSearch(sp.get("q") ?? "");
  const status = sp.get("status") ?? "";
  const service = sp.get("service") ?? "";

  let query = supabase.from("leads").select(COLUMNS.join(",")).order("created_at", { ascending: false }).limit(10000);
  if (LEAD_STATUSES.includes(status as never)) query = query.eq("status", status);
  if (service) query = query.eq("service", service);
  if (q) query = query.or(`name.ilike.%${q}%,email.ilike.%${q}%,store_url.ilike.%${q}%,message.ilike.%${q}%`);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const csv = "﻿" + toCsv((data ?? []) as unknown as Array<Record<string, unknown>>, COLUMNS);
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
