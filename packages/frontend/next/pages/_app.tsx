import "@/styles/global-styles.css";
import { AppProps } from "next/app";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
