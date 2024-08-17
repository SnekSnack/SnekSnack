"use client";

import { createTheme, rgbToHex } from '@mui/material/styles';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily
  },
  components: {
    MuiButton: {
			styleOverrides: {
				root: {
					margin: 0,
					color: 'white',  
					backgroundColor: '#3c70ba',
					fontFamily: inter.style.fontFamily,
					'&:hover': {
						color: 'white',  
						backgroundColor: '#414141',
					},
				},
			},
		},
  },
});

export default theme;
