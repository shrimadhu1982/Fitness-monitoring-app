import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    // Get data from frontend
    const {
      steps,
      exercise,
      sleep,
      goal,
    } = await req.json();

    // Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    // AI Prompt
    const prompt = `
You are FitAI, a friendly, motivating, and professional fitness coach.

Analyze the user's fitness details.

User Details:
- Steps Walked: ${steps}
- Exercise Duration: ${exercise} minutes
- Sleep Hours: ${sleep}
- Fitness Goal: ${goal}

Create an attractive personalized fitness report using emojis.

Follow this exact format:

🏆 FITNESS SCORE
Give a score out of 100 based on the user's activity, sleep, and exercise.

📊 TODAY'S ANALYSIS
Briefly analyze today's activity and overall fitness.

💪 WORKOUT PLAN
Recommend exercises with sets, reps, or duration based on the user's goal.

🍎 NUTRITION TIPS
Suggest healthy foods and snacks for today.

💧 HYDRATION
Recommend daily water intake.

😴 RECOVERY
Give sleep and recovery advice.

🎯 TOMORROW'S CHALLENGE
Give one realistic challenge for tomorrow.

🔥 MOTIVATION
End with one short motivational quote.

Rules:
- Use emojis.
- Keep the report under 200 words.
- Be positive and encouraging.
- Make the report look visually attractive.
`;

    // Generate AI response
    const result = await model.generateContent(prompt);

    const recommendation = result.response.text();

    // Return response
    return NextResponse.json({
      success: true,
      recommendation,
    });

  } catch (error) {

  console.error("Gemini Error:", error);

  let message =
    "🤖 AI Coach is currently busy.\n\nPlease try again in a few moments.\n\nYour fitness data has been saved successfully. ✅";

  if (error.status === 503) {

    message =
      "🤖 AI Coach is experiencing high demand.\n\nPlease try again in a minute.\n\nYour fitness data has been saved successfully. ✅";

  }

  return NextResponse.json(
    {
      success: false,
      recommendation: message,
    },
    {
      status: 200,
    }
  );

}
}