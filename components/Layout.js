export default function Layout({ user, children }) {
  return (
    <div style={{fontFamily:"system-ui",background:"#0b1020",color:"#eef2ff",minHeight:"100vh"}}>
      <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 20px",borderBottom:"1px solid #1f2a44"}}>
        <div style={{fontWeight:700,letterSpacing:0.3}}>OPP CRM</div>
        <nav style={{display:"flex",gap:16}}>
          <a href="/protected" style={{textDecoration:"none",color:"#c7d2fe"}}>Dashboard</a>
          <a href="/new-send" style={{textDecoration:"none",color:"#c7d2fe"}}>New Send</a>
        </nav>
        <div style={{opacity:0.9,fontSize:14}}>{user?.email}</div>
      </header>
      <main style={{maxWidth:1100,margin:"24px auto",padding:"0 16px"}}>{children}</main>
    </div>
  );
}
