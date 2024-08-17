"use client";

import { createTheme } from '@mui/material/styles';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily
  },
});

export default theme;
