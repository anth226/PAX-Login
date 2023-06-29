import "../styles/globals.css";
import { FC } from "react";
import 'dotenv/config'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

import { ToastContainer } from "react-toastify";

const theme = createTheme();
const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
