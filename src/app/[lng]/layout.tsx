import Head from "next/head";
import Header from "./Header";
import { languages } from "../i18n/settings";
import "@/styles/globals.css";

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
        <main className="flex flex-col h-screen antialiased">
          <Header
            params={{
              lng: props.params.lng,
            }}
          />
          <div className="flex-1 container mx-auto pt-20">{props.children}</div>
        </main>
        <footer></footer>
      </body>
    </html>
  );
}
