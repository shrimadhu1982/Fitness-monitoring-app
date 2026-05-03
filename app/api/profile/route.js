import { connectDB } from "../../lib/db";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    await connectDB();

    const token = req.headers.get("authorization");

    if (!token) {
      return Response.json({ error: "No token" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, "secret123");

    const user = await User.findById(decoded.id).select("-password");

    return Response.json(user, { status: 200 });

  } catch (error) {
    console.error("PROFILE ERROR:", error);
    return Response.json({ error: "Invalid token" }, { status: 401 });
  }
}