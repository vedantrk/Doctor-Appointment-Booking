import { Resend } from "resend";
// import { Email } from "./email";
import { NextResponse } from "next/server";
import EmailTemplate from "@/emails";
// Doctor-appointment-app :key name
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const response = await req.json();

  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [response.data.Email],
      subject: "Appointment Booking Confirmation",
      react: EmailTemplate({ response }),
    });
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
