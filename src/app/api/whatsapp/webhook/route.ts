import { NextRequest, NextResponse } from "next/server";
import { generateSupportResponse } from "@/lib/gemini";

// WhatsApp webhook for incoming messages (Gupshup/Wati format)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract message based on provider format
    // Gupshup format
    const incomingMessage = body.payload?.payload?.text || body.text || body.message?.text || "";
    const senderPhone = body.payload?.sender?.phone || body.mobile || body.from || "";

    if (!incomingMessage || !senderPhone) {
      return NextResponse.json({ status: "no_message" });
    }

    console.log(`[WhatsApp] Message from ${senderPhone}: ${incomingMessage}`);

    // TODO: Look up patient from Supabase by phone
    // const supabase = await createServerSupabase();
    // const { data: patient } = await supabase
    //   .from("patients")
    //   .select("*")
    //   .eq("phone", senderPhone)
    //   .single();

    // Generate AI response
    const aiResult = await generateSupportResponse(
      incomingMessage,
      `Phone: ${senderPhone}`
    );

    // TODO: Send response via WhatsApp API
    // await sendWhatsAppMessage(senderPhone, aiResult.response);

    // TODO: Log both messages
    // await supabase.from("support_messages").insert([
    //   {
    //     patient_id: patient?.id,
    //     channel: "whatsapp",
    //     direction: "inbound",
    //     message: incomingMessage,
    //     handled_by: aiResult.needs_escalation ? "human" : "ai",
    //     resolved: !aiResult.needs_escalation,
    //   },
    //   {
    //     patient_id: patient?.id,
    //     channel: "whatsapp",
    //     direction: "outbound",
    //     message: aiResult.response,
    //     handled_by: "ai",
    //     resolved: !aiResult.needs_escalation,
    //   },
    // ]);

    if (aiResult.needs_escalation) {
      console.log(`[WhatsApp] Escalating to human: ${aiResult.escalation_reason}`);
      // TODO: Notify support team via Slack/email
    }

    return NextResponse.json({
      status: "ok",
      response: aiResult.response,
      escalated: aiResult.needs_escalation,
    });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}

// Webhook verification (GET request from WhatsApp provider)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const challenge = searchParams.get("hub.challenge") || searchParams.get("challenge");

  if (challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ status: "webhook_active" });
}

// Helper to send WhatsApp message (placeholder)
async function sendWhatsAppMessage(phone: string, message: string) {
  const apiKey = process.env.WHATSAPP_API_KEY;
  const apiUrl = process.env.WHATSAPP_API_URL;

  if (!apiKey || !apiUrl) {
    console.log(`[WhatsApp] Would send to ${phone}: ${message}`);
    return;
  }

  // Gupshup API format
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({
      channel: "whatsapp",
      source: "917834811114", // Sukhya WhatsApp number
      destination: phone.replace("+", ""),
      message: {
        type: "text",
        text: message,
      },
    }),
  });

  if (!response.ok) {
    console.error("[WhatsApp] Send failed:", await response.text());
  }
}
