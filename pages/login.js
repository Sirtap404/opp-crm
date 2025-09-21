import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  return (
    <main style={{fontFamily:'system-ui',maxWidth:480,margin:'60px auto'}}>
      <h1>Logga in</h1>
      <p>Skriv din e-post så skickar vi en magic-link.</p>
      <form onSubmit={async e => { e.preventDefault(); await signIn("email", { email }); }}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)}
               placeholder="din@ottoochpartners.se" required
               style={{padding:10,width:"100%",marginBottom:10}} />
        <button style={{padding:"10px 16px"}}>Skicka länk</button>
      </form>
    </main>
  );
}