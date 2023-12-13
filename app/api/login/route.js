import { connectWithMongo } from "@/lib/mongodb";

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import Users from "@/models/users";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    await connectWithMongo();
    const user = await Users.findOne({ email: email });

    if (user && user._id) {
      const hashedPass = await bcrypt.compare(password, user.password);
      if (hashedPass)
        return NextResponse.json(
          {
            message: "User found Successfully",
            user: user,
          },
          {
            status: 200,
          }
        );
      return NextResponse.json(
        {
          message: "Wrong Password",
        },
        {
          status: 401,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "User not registered with us",
        },
        {
          status: 404,
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
