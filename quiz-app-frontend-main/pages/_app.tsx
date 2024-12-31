import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "../auth/keycloak";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Component {...pageProps} />
    </ReactKeycloakProvider>
  );
}

export default MyApp;
