import Head from "next/head";
import Header from "./Header";
import { languages } from "../i18n/settings";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    lng: string;
  };
}

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function Layout(props: LayoutProps) {
  return (
    <html>
      <Head>
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
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex pt-10 flex-col h-screen w-screen antialiased">
            <Header
              params={{
                lng: props.params.lng,
              }}
            />
            <div className="h-full w-full p-8">{props.children}</div>
          </main>
          <Toaster />
          <footer></footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
