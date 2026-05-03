import { connectDB } from "../../lib/db";
import User from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body;

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        { error: "Invalid password" },
        { status: 401 }
      );
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      "secret123",
      { expiresIn: "1d" }
    );

    return Response.json({ token }, { status: 200 });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}