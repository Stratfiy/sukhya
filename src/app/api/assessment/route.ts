import { NextRequest, NextResponse } from "next/server";
import { analyzeAssessment } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vertical, responses } = body;

    if (!vertical || !responses) {
      return NextResponse.json(
        { error: "Missing vertical or responses" },
        { status: 400 }
      );
    }

    // Analyze with Gemini
    const analysis = await analyzeAssessment(vertical, responses);

    // TODO: When Supabase is connected, save to assessments table
    // const supabase = createServerSupabase();
    // const { data: assessment } = await supabase
    //   .from("assessments")
    //   .insert({
    //     patient_id: patientId,
    //     vertical,
    //     responses,
    //     ai_analysis: analysis,
    //     severity_score: analysis.severity_score,
    //     recommended_plan: analysis.recommended_plan,
    //     status: "pending",
    //   })
    //   .select()
    //   .single();

    return NextResponse.json({
      analysis,
      assessmentId: `temp-${Date.now()}`,
    });
  } catch (error) {
    console.error("Assessment analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze assessment. Please try again." },
      { status: 500 }
    );
  }
}
