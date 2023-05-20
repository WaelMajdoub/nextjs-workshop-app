import { useContext,useState,useEffect } from 'react';

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/context/AuthContext';

const theme = createTheme();

//create context api instance
// const theme2 = useContext(ThemeContext);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Navbar />
          <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}