export default async function AuthLayout({
  children,
}
) {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      {children}
    </div>
  )
}