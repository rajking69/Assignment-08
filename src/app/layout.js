import dns from "node:dns";
dns.setServers(["8.8.8.8", "8.8.8.4"]);
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import AppToaster from "./Components/AppToaster/AppToaster";

export const metadata = {
  title: "ReadVault | Borrow Books Online",
  description: "Explore Story, Tech, and Science books — borrow digitally, read anywhere.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <AppToaster />
        {children}
      </body>
    </html>
  );
}
