import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { publicPlatformScript } from "./publicConfig";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.post("/api/contact", async (req, res) => {
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
      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Sherif Ahmed Portfolio <onboarding@resend.dev>",
          to: ["sherifahed25@gmail.com"],
          reply_to: email,
          subject: `Portfolio inquiry from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
          html: `<h2>New portfolio inquiry</h2><p><strong>Name:</strong> ${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p><p><strong>Email:</strong> ${email.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p><p>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br />")}</p>`,
        }),
      });

      if (!resendResponse.ok) {
        console.error("[Contact] Resend rejected inquiry:", await resendResponse.text());
        return res.status(502).json({ error: "We could not deliver your inquiry right now." });
      }

      return res.json({ success: true });
    } catch (error) {
      console.error("[Contact] Failed to deliver inquiry:", error);
      return res.status(502).json({ error: "We could not deliver your inquiry right now." });
    }
  });
  app.get("/api/platform/config.js", (_req, res) => {
    res.set("Cache-Control", "no-store").type("application/javascript").send(publicPlatformScript());
  });
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const port = Number(process.env.PORT || "3000");
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid PORT");
  server.on("error", error => { console.error("Server failed:", error.message); process.exit(1); });
  server.listen(port, "0.0.0.0", () => console.log(`Server listening on port ${port}`));
}

startServer().catch(error => { console.error(error); process.exit(1); });
