import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retry if Gemini is busy
async function generateWithRetry(model, prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (error) {
      if (error.status === 503 && i < retries - 1) {
        console.log(`Gemini busy. Retrying... (${i + 1})`);
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } else {
        throw error;
      }
    }
  }
}

export async function POST(req) {
  try {
    const {
      steps,
      sleep,
      water,
      mood,
      stress,
      exercise,
      goal,
    } = await req.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an expert AI Fitness Coach.

User Details:

- Steps Walked: ${steps}
- Exercise Duration: ${exercise} minutes
- Sleep: ${sleep} hours
- Water Intake: ${water} litres
- Mood: ${mood}
- Stress Level: ${stress}/10
- Fitness Goal: ${goal}

Return ONLY valid JSON.

Format:

{
  "workout":"...",
  "diet":"...",
  "recovery":"...",
  "tasks":"..."
}

Instructions:

Workout:
- Mention warm-up
- Main workout
- Cool-down
- Keep under 80 words

Diet:
- Breakfast
- Lunch
- Evening Snack
- Dinner
- Hydration Tip
- Keep under 100 words

Recovery:
- Sleep advice
- Stretching
- Relaxation
- Recovery tip
- Keep under 80 words

Tasks:
Generate exactly 5 checklist-style daily tasks.

Return JSON only.
`;

    const result = await generateWithRetry(model, prompt);

    let text = result.response.text();

    // Remove markdown if Gemini adds it
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const data = JSON.parse(text);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini Error:", error);

    let busyMessage =
      "🤖 AI Coach is currently busy.\n\nPlease try again in a minute.\n\nYour activity data has been loaded successfully. ✅";

    if (error.status !== 503) {
      busyMessage =
        "Unable to generate AI recommendations at the moment. Please try again later.";
    }

    return NextResponse.json({
      workout: busyMessage,
      diet: busyMessage,
      recovery: busyMessage,
      tasks: busyMessage,
    });
  }
}