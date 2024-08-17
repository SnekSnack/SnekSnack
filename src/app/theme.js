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
					color: 'white',  // Sets the button text color to black
					backgroundColor: '#3c70ba',
					fontFamily: inter.style.fontFamily,
					'&:hover': {
						color: 'black',  // Change the text color on hover (example: red)
						backgroundColor: '#95b2db',
					},
				},
			},
		},
  },
});

export default theme;
