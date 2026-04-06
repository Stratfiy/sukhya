import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY || "AIzaSyADTEGRTIAIQQ712j0Q87M3tUnbVxY2MU4"
);

export const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

export async function analyzeAssessment(
  vertical: string,
  responses: Record<string, string>
) {
  const prompt = `You are a medical assessment AI for Sukhya Health, an Indian telehealth platform. 
Analyze the following patient self-assessment for the "${vertical}" vertical.

Patient responses:
${JSON.stringify(responses, null, 2)}

Provide a JSON response with:
{
  "severity_score": <1-10>,
  "severity_label": "<mild|moderate|severe>",
  "key_concerns": ["<concern1>", "<concern2>"],
  "recommended_plan": "<starter|complete>",
  "summary": "<2-3 sentence summary for patient>",
  "doctor_notes": "<clinical notes for reviewing doctor>",
  "suggested_treatments": ["<treatment1>", "<treatment2>"],
  "lifestyle_recommendations": ["<rec1>", "<rec2>"],
  "urgency": "<routine|soon|urgent>"
}

IMPORTANT: You are NOT diagnosing. You are pre-screening to help the doctor prioritize.
Respond with ONLY valid JSON, no markdown.`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

export async function analyzeProgressPhotos(
  vertical: string,
  description: string,
  monthNumber: number
) {
  const prompt = `You are a progress analysis AI for Sukhya Health.
A patient in the "${vertical}" treatment program has uploaded progress photos at month ${monthNumber}.

Photo description/context: ${description}

Provide a JSON response with:
{
  "progress_score": <1-10>,
  "progress_label": "<no_change|slight_improvement|moderate_improvement|significant_improvement>",
  "observations": ["<obs1>", "<obs2>"],
  "recommendations": ["<rec1>", "<rec2>"],
  "encourage_message": "<motivational message for patient>",
  "flag_for_doctor": <true|false>,
  "flag_reason": "<reason if flagged>"
}

IMPORTANT: This is supportive analysis, not diagnosis. Always recommend continuing doctor guidance.
Respond with ONLY valid JSON, no markdown.`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|```\n?/g, "").trim();
  return JSON.parse(cleaned);
}

export async function generateSupportResponse(
  message: string,
  patientContext?: string
) {
  const prompt = `You are a warm, helpful customer support AI for Sukhya Health, India's AI-powered telehealth platform.

Patient message: "${message}"
${patientContext ? `Patient context: ${patientContext}` : ""}

Rules:
1. Be warm, empathetic, and professional
2. NEVER give medical advice or diagnose
3. For medical questions, say you'll connect them with their doctor
4. For shipping/order queries, provide helpful tracking info
5. For pricing queries, share plan details
6. For complaints, acknowledge and escalate
7. Keep responses concise (max 3 sentences)
8. Use a friendly Indian English tone

Respond with JSON:
{
  "response": "<your response>",
  "intent": "<faq|shipping|medical|pricing|complaint|general>",
  "needs_escalation": <true|false>,
  "escalation_reason": "<reason if needs escalation>"
}

Respond with ONLY valid JSON, no markdown.`;

  const result = await geminiModel.generateContent(prompt);
  const text = result.response.text();
  const cleaned = text.replace(/```json\n?|```\n?/g, "").trim();
  return JSON.parse(cleaned);
}
