import { connectDB } from "../../lib/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    await User.create({ name, email, password: hashed });

    return Response.json(
      { message: "User created" },
      { status: 201 }
    );

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}