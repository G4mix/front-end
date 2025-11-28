import "@/styles/auth.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="authBody">
      <div className="authWrapper">{children}</div>
    </div>
  );
}
