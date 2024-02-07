import { languages } from "../i18n/settings";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function Layout(props: LayoutProps) {
  return (
    <html>
      {/* <Head>
        <title>Structurer | Structure and Analyze your medical texts</title>
        <meta
          name="description"
          content="Structure and Analyze your medical texts."
          key="desc"
        />
        <meta property="og:title" content="FHIR Creator" key="title" />
        <meta property="og:url" content="https://fhir-creator.vercel.app/" />
        <meta
          property="og:description"
          content="Structure and Analyze your medical texts"
        />
      </Head> */}
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          {props.children}
        </div>
      </body>
    </html>
  );
}
