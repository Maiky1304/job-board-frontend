import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import store from "../hooks/redux/store";
import { AuthProvider } from "../hooks/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <CookiesProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
