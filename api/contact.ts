type ContactBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

type VercelRequest = { method?: string; body?: ContactBody };
type VercelResponse = {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
};

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 320 || !message || message.length > 5000) {
    return res.status(400).json({ error: "Please provide a valid name, email, and message." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "The contact service is not configured yet." });
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Sherif Portfolio <onboarding@resend.dev>",
        to: ["sherifahed25@gmail.com"],
        reply_to: email,
        subject: `Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        html: `<h2>New portfolio Message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
      }),
    });

    if (!response.ok) {
      console.error("[Contact] Resend rejected inquiry:", await response.text());
      return res.status(502).json({ error: "We could not deliver your inquiry right now." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Contact] Failed to deliver inquiry:", error);
    return res.status(502).json({ error: "We could not deliver your inquiry right now." });
  }
}
