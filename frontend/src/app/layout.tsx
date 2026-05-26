import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/shared/ToastContainer";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "VedaAI - AI Assessment Creator",
  description: "Create and grade premium assessments with the power of VedaAI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} antialiased`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
