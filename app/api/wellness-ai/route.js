import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {

  try {

    const {
      water,
      mood,
      stress,
      sleep,
      steps,
    } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI Wellness Coach.

Analyze the following user's health data.

Water Intake: ${water} litres
Mood: ${mood}
Stress Level: ${stress}/10
Sleep: ${sleep} hours
Steps Walked: ${steps}

Create a beautiful wellness report.

Use this exact format:

🏆 WELLNESS SCORE
Give a score out of 100.

🧠 MENTAL HEALTH
Explain how the user's mood and stress affect wellbeing.

💧 HYDRATION
Suggest how much more water should be consumed.

😴 RECOVERY
Give sleep advice.

🚶 ACTIVITY
Comment on today's physical activity.

🧘 STRESS MANAGEMENT
Recommend breathing exercises, meditation or yoga.

🍎 HEALTH TIP
Give one healthy food recommendation.

🎯 TOMORROW'S GOAL
Give one achievable goal.

🌟 MOTIVATION
End with one motivational quote.

Use emojis.

Keep the response under 250 words.

Make it attractive and encouraging.
`;

    const result =
      await model.generateContent(prompt);

    return NextResponse.json({

      recommendation:
        result.response.text(),

    });

  }

  catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        recommendation:
          "Unable to generate AI wellness report.",

      },

      {

        status: 500,

      }

    );

  }

}