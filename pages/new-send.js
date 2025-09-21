import { useState } from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/Layout";

export default function NewSend({ user }) {
  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [subject,setSubject] = useState("Din video");
  const [videoId,setVideoId] = useState("");
  const [status,setStatus] = useState(null);

  const submit = async e => {
    e.preventDefault();
    setStatus("Skickar…");
    const r = await fetch("/api/send", {
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ email, name, subject, videoId })
    });
    const data = await r.json();
    setStatus(r.ok ? `Genererad länk: ${data.video_url}` : `Fel: ${data.error || "okänt fel"}`);
  };

  return (
    <Layout user={user}>
      <h1 style={{marginBottom:8}}>Nytt utskick</h1>
      <p style={{opacity:0.8,marginBottom:20}}>Generera en personlig Vidyard-länk innan e-postutskick.</p>
      <form onSubmit={submit} style={{display:"grid",gap:12,background:"#111936",padding:16,borderRadius:12,border:"1px solid #1f2a44",maxWidth:560}}>
        <input placeholder="Mottagarens e-post" value={email} onChange={e=>setEmail(e.target.value)} required style={iStyle}/>
        <input placeholder="Mottagarens namn (valfritt)" value={name} onChange={e=>setName(e.target.value)} style={iStyle}/>
        <input placeholder="Ämnesrad" value={subject} onChange={e=>setSubject(e.target.value)} required style={iStyle}/>
        <input placeholder="Vidyard VIDEO_ID" value={videoId} onChange={e=>setVideoId(e.target.value)} required style={iStyle}/>
        <button style={{padding:"10px 14px",background:"#6366f1",border:"none",borderRadius:10,color:"#fff"}}>Generera länk</button>
        {status && <div style={{marginTop:6,opacity:0.95}}>{status}</div>}
      </form>
    </Layout>
  );
}

const iStyle = { padding:"10px 12px", borderRadius:10, border:"1px solid #1f2a44", background:"#0b1020", color:"#e5e7eb" };

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session?.user?.email) return { redirect: { destination: "/login", permanent:false } };
  return { props: { user: { email: session.user.email } } };
}
