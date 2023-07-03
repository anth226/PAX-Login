import "../styles/globals.css";
import 'dotenv/config'
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from 'react'

import { ToastContainer } from "react-toastify";
import { useMediaQuery } from "@material-ui/core";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App = ({ Component, pageProps }) => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'light',
        },
      }),
    [prefersDarkMode],
  );
  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
