import "../styles/globals.css";
import 'dotenv/config'
import { Box, Container, CssBaseline, Fab, ThemeProvider, createTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useMemo } from 'react'
import { ToastContainer } from "react-toastify";
import {Brightness7, Brightness4} from '@mui/icons-material'

const App = ({ Component, pageProps }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  }

  useEffect(()=>{
    setMode(prefersDarkMode ? 'dark' : 'light')
  },[prefersDarkMode])

  const theme = useMemo(()=>{
    return createTheme({
          palette: {
            mode: mode,
        },
    })
  },[mode])
  
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Container className={`${mode}`}>
        <Component {...pageProps} />
      </Container>
      <Box sx={{position:"fixed",top:10,right:10}}>
        <Fab size="small" color="secondary" aria-label="add" onClick={()=>toggleColorMode()}>
          {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
        </Fab>
      </Box>
    </ThemeProvider>
  );
};

export default App;
