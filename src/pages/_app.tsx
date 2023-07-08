import "../styles/globals.css";
import 'dotenv/config'
import React from 'react'
import { ToastContainer } from "react-toastify";
import LanguageProvider from "../context/LanguageProvider";
import ThemeProvider from "../context/theme/ThemeProvider";

const App = ({ Component, pageProps }) => {

  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastContainer />
          <Component {...pageProps} />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
