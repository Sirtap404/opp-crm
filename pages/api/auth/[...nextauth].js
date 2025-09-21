import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import nodemailer from "nodemailer";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    EmailProvider({
      server: {
        host: "smtp.postmarkapp.com",
        port: 587,
        auth: {
          user: process.env.POSTMARK_SMTP_USER,
          pass: process.env.POSTMARK_SMTP_PASSWORD
        }
      },
      from: process.env.EMAIL_FROM,
      async sendVerificationRequest({ identifier, url, provider }) {
        const transport = nodemailer.createTransport(provider.server);
        const result = await transport.sendMail({
          to: identifier,
          from: provider.from,
          subject: "Logga in till O&P CRM",
          html: `<p>Hej! Klicka för att logga in:</p><p><a href="${url}">${url}</a></p><p>Länken gäller i 10 minuter.</p>`,
          text: `Logga in: ${url}`,
          headers: { "X-Postmark-Message-Stream": "outbound" }
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) throw new Error(`Email to ${failed.join(", ")} failed`);
      }
    })
  ],
  pages: { signIn: "/login" }
});
