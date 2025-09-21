import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) return res.status(401).json({ error: "Not signed in" });

  const { email, name, subject, videoId } = req.body || {};
  if (!email || !subject || !videoId) return res.status(400).json({ error: "Missing fields" });

  const video_url = `https://share.vidyard.com/watch/${videoId}?vyemail=${encodeURIComponent(email)}`;
  return res.status(200).json({ ok: true, video_url });
}
