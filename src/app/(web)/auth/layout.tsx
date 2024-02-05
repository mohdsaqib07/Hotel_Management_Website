import { type Metadata } from "next";
export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
