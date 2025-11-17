import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("API DIPANGGIL");

  if (req.method !== "POST") {
    console.log("METHOD:", req.method);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  console.log("BODY:", body);
  const number = body.number || "(tidak ada)";

  // Buat transporter pakai Gmail (GMAIL_USER = pengirim, GMAIL_APP_PASSWORD = app password)
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "android@support.whatsapp.com", // <-- PENERIMA DISET DI SINI
      subject: `Questions regarding the whatsapp application`,
      text: `Dear WhatsApp team, let me introduce myself. My name is [RijalJunior]. I am a WhatsApp user experiencing login issues. The problem is "Login is currently unavailable." This issue occurs frequently and repeatedly. I have requested assistance multiple times through the same Gmail account, and have experienced a limit/24 hours left to appeal. Please, WhatsApp, resolve the issue with my WhatsApp account. My number is (+${number}). Thank you for your help and attention.

Yours sincerely
[RijalJunior]`,
    });

    console.log("Email Successfull send", info);
    return res.status(200).json({ message: "Email Successfull send" });

  } catch (err) {
    console.error("Syntax Error", err);
    return res.status(500).json({ error: "Syntax Erorr", detail: err.message });
  }
}
