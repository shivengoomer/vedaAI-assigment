import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "@/components/shared/ToastContainer";
import { TopLoadingBar } from "@/components/layout/TopLoadingBar";
import { Suspense } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "VedaAI - AI Assessment Creator (By Shiven Goomer)",
  description: "Create and grade premium assessments with the power of VedaAI.",
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en">
        <body
          className={`${bricolage.variable} antialiased`}
        >
          <Suspense fallback={null}>
            <TopLoadingBar />
          </Suspense>
          {children}
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
