import { connectWithMongo } from "@/lib/mongodb";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Users from "@/models/users";

export async function POST(req) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    const hashedPass = await bcrypt.hash(password, 10);
    await connectWithMongo();
    const user = await Users.findOne({ email: email });
    if (user && user._id) {
      return NextResponse.json(
        {
          message: "User already registered",
        },
        {
          status: 409,
        }
      );
    } else {
      await Users.create({
        firstName,
        lastName,
        email,
        password: hashedPass,
      });
      return NextResponse.json(
        {
          message: "User registered successfully",
        },
        {
          status: 201,
        }
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
