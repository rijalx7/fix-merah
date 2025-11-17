import nodemailer from "nodemailer";
import { gmailList } from "../addgmail.js"; // ambil daftar email & password

export default async function handler(req, res) {
  console.log("API DIPANGGIL");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = req.body || {};
  const number = body.number || "(tidak ada)";

  // Pilih 1 email random dari 100 slot
  const randomEmail = gmailList[Math.floor(Math.random() * gmailList.length)];

  if (!randomEmail || !randomEmail.user || !randomEmail.pass) {
    return res.status(500).json({ error: "Gmail list kosong atau tidak lengkap" });
  }

  console.log("PENGIRIM DIPILIH:", randomEmail.user);

  // Buat transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: randomEmail.user,
      pass: randomEmail.pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: randomEmail.user,
      to: "android@support.whatsapp.com",
      subject: `Questions regarding the whatsapp application`,
      text: `Dear WhatsApp team, let me introduce myself. My name is [RijalJunior]. I am a WhatsApp user experiencing login issues. The problem is "Login is currently unavailable." This issue occurs frequently and repeatedly. I have requested assistance multiple times through the same Gmail account, and have experienced a limit/24 hours left to appeal. Please, WhatsApp, resolve the issue with my WhatsApp account. My number is (+${number}). Thank you for your help and attention.

Yours sincerely
[RijalJunior]`,
    });

    console.log("Email Successfull send", info);
    return res.status(200).json({ message: "Email Successfull send" });

  } catch (err) {
    console.error("Syntax Error", err);
    return res.status(500).json({ error: "Syntax Error", detail: err.message });
  }
      }
