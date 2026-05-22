import { NextResponse } from "next/server";

import { getPublicReport } from "@/services/share/share-service";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ publicId: string }> }
) {
  const { publicId } = await params;

  if (!/^[a-zA-Z0-9_-]{8,80}$/.test(publicId)) {
    return NextResponse.json({ error: "Invalid report id." }, { status: 400 });
  }

  try {
    const report = await getPublicReport(publicId);

    if (!report) {
      return NextResponse.json({ error: "Report not found." }, { status: 404 });
    }

    return NextResponse.json(report);
  } catch {
    return NextResponse.json(
      { error: "We could not load this report right now." },
      { status: 500 }
    );
  }
}
