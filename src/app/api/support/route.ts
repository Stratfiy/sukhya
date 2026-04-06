import { NextRequest, NextResponse } from "next/server";
import { generateSupportResponse } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { message, patientContext } = await request.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const result = await generateSupportResponse(message, patientContext);

    // TODO: Log to support_messages table in Supabase
    // const supabase = await createServerSupabase();
    // await supabase.from("support_messages").insert({
    //   patient_id: patientId,
    //   channel: "web",
    //   direction: "inbound",
    //   message,
    //   handled_by: result.needs_escalation ? "human" : "ai",
    //   resolved: !result.needs_escalation,
    // });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Support chat error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
