import Head from "next/head";
import Header from "./Header";
import "./globals.css";
import { languages } from "../i18n/settings";

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
        <div className="w-screen h-screen overflow-hidden">
          <Header
            params={{
              lng: props.params.lng,
            }}
          />
          <main className="flex flex-row h-full w-full overflow-hidden">
            {props.children}
          </main>

          <footer></footer>
        </div>
      </body>
    </html>
  );
}
