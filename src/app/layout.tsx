import Head from "next/head";
import Header from "./Header";
import "./globals.css";

interface LayoutProps {
  children: React.ReactNode;
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
          <Header />
          <main className="flex flex-row h-full w-full overflow-hidden">
            {props.children}
          </main>

          <footer></footer>
        </div>
      </body>
    </html>
  );
}
