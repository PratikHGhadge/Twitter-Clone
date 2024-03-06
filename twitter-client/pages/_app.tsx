import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GoogleOAuthProvider clientId="275918096148-6arsk24n21p5aj4b2ohogvc1dkqds36i.apps.googleusercontent.com">
        <Toaster />
        <Component {...pageProps} />
      </GoogleOAuthProvider>
      ;
    </div>
  );
}
