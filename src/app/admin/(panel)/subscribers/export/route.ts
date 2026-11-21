import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin/auth";
import { toCsv } from "@/lib/admin/format";

export const dynamic = "force-dynamic";

const COLUMNS = ["email", "created_at", "source_page", "unsubscribed"];

export async function GET(request: Request) {
  const { supabase } = await requireAdmin();
  const show = new URL(request.url).searchParams.get("show") ?? "";
  let query = supabase.from("subscribers").select(COLUMNS.join(",")).order("created_at", { ascending: false }).limit(50000);
  if (show === "") query = query.eq("unsubscribed", false);
  if (show === "unsubscribed") query = query.eq("unsubscribed", true);
  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const csv = "﻿" + toCsv((data ?? []) as unknown as Array<Record<string, unknown>>, COLUMNS);
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
