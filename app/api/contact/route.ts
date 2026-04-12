import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, phone, email, message } = await request.json();

  if (!name || (!email && !phone)) {
    return NextResponse.json(
      { error: "Meno a aspoň jeden kontakt sú povinné." },
      { status: 400 }
    );
  }

  const apiKey = process.env.SMTP2GO_API_KEY;
  const sender = process.env.SMTP2GO_SENDER;
  const recipient = process.env.CONTACT_FORM_RECIPIENT;

  if (!apiKey || !sender || !recipient) {
    console.error("Missing SMTP2GO environment variables");
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const body = `
Nová správa z kontaktného formulára na autoplynmk.sk

Meno:    ${name}
Telefón: ${phone || "—"}
Email:   ${email || "—"}

Správa:
${message || "—"}
  `.trim();

  const res = await fetch("https://api.smtp2go.com/v3/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      to: [recipient],
      sender,
      subject: `Nová objednávka termínu – ${name}`,
      text_body: body,
      html_body: `
        <h2>Nová správa z kontaktného formulára</h2>
        <p><strong>Meno:</strong> ${name}</p>
        <p><strong>Telefón:</strong> ${phone || "—"}</p>
        <p><strong>Email:</strong> ${email || "—"}</p>
        <hr/>
        <p><strong>Správa:</strong></p>
        <p>${(message || "—").replace(/\n/g, "<br/>")}</p>
      `,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("SMTP2GO error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
