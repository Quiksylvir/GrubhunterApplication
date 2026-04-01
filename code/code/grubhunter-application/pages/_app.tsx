import "@/styles/globals.css";
import "@/styles/layout.css";
import { Layout } from "./components/layout";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }: AppProps) {
  const { session, ...remainingProps } = pageProps;
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...remainingProps} />
      </Layout>
    </SessionProvider>
  );
}
