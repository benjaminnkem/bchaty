import Providers from "@/lib/utils/providers";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <main>
      <SessionProvider session={session}>
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </SessionProvider>
    </main>
  );
}
