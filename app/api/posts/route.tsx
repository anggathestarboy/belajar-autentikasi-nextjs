import { cookies } from "next/headers";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const cookieStore = await cookies(); //
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Token tidak ada" },
        { status: 401 }
      );
    }

    console.log("TOKEN:", token);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/posts`,
      body,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: 201 });

  } catch (error: any) {
    console.error("ROUTE ERROR:", error);

    return NextResponse.json(
      error.response?.data || { message: "Server error" },
      { status: error.response?.status || 500 }
    );
  }
}