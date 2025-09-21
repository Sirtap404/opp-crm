import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/Layout";

export default function Protected({ user }) {
  return (
    <Layout user={user}>
      <h1 style={{marginBottom:12}}>Inloggad ✅</h1>
      <p style={{marginBottom:24}}>Välkommen, {user.email}.</p>
      <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:16}}>
        <div style={{background:"#111936",padding:16,borderRadius:12,border:"1px solid #1f2a44"}}>
          <div style={{opacity:0.8,fontSize:12}}>Totala utskick</div>
          <div style={{fontSize:28,fontWeight:700}}>—</div>
        </div>
        <div style={{background:"#111936",padding:16,borderRadius:12,border:"1px solid #1f2a44"}}>
          <div style={{opacity:0.8,fontSize:12}}>Öppningsgrad</div>
          <div style={{fontSize:28,fontWeight:700}}>—</div>
        </div>
        <div style={{background:"#111936",padding:16,borderRadius:12,border:"1px solid #1f2a44"}}>
          <div style={{opacity:0.8,fontSize:12}}>Senaste visning</div>
          <div style={{fontSize:28,fontWeight:700}}>—</div>
        </div>
      </section>
      <div style={{marginTop:24}}>
        <a href="/new-send" style={{padding:"10px 14px",background:"#6366f1",borderRadius:10,color:"#fff",textDecoration:"none"}}>Skapa nytt utskick</a>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session?.user?.email) {
    return { redirect: { destination: "/login", permanent: false } };
  }
  return { props: { user: { email: session.user.email } } };
}
