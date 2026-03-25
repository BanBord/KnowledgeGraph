import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Redaktions-Netzwerk",
  description: "Journalistisches Recherche-Netzwerk-Tool für Lokalredaktionen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="dark">
      <head>
        {/* Anti-FOUC: Theme vor erstem Paint aus localStorage setzen */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`
          ${geistSans.variable} ${geistMono.variable} antialiased min-h-screen
          bg-canvas text-text
          dark:bg-canvas dark:text-text
          not-dark:bg-[#f5f3ef] not-dark:text-[#1a1814]
        `}
      >
        {children}
      </body>
    </html>
  );
}
