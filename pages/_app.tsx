import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar/Navbar";
import NextRouterLoader from "@/components/atoms/NextRouterLoader";



export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <NextRouterLoader />
    </>
  );
}
