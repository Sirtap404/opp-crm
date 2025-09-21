import { getSession, signOut } from "next-auth/react";

export async function getServerSideProps(ctx){
  const session = await getSession(ctx);
  if (!session) return { redirect: { destination: "/login", permanent: false } };
  return { props: { user: session.user } };
}
export default function Protected({ user }){
  return (
    <main style={{fontFamily:'system-ui',padding:40}}>
      <h1>Inloggad ✅</h1>
      <p>{user?.email}</p>
      <button onClick={()=>signOut()}>Logga ut</button>
    </main>
  );
}