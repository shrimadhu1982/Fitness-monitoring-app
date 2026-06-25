import { NextResponse } from "next/server";

export async function POST() {

  return NextResponse.json({
    success: true,

    data: {
      advice:
        "Walk 3000 more steps today and stay hydrated.",

      diet:
        "Include more protein and fruits today.",

      recovery:
        "Sleep before 11 PM for better recovery.",

      workout:
        "20-minute full body workout recommended.",

      tasks: [
        "Drink 3L water",
        "Walk 8000 steps",
        "10 pushups x 3",
        "Stretch for 10 mins",
        "Sleep before 11 PM",
      ],
    },
  });
}