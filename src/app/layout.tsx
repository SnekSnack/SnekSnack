import type { Metadata } from "next";

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ProtectedRoute from "@/components/ProtectedRoute";
import theme from './theme';
import "./globals.css";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const title = "IT PROJECT"
export const metadata: Metadata = {
  title: title,
  description: "Log in and chat now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="globals.css" />
      </head>
      {/* ThemeProvider and CssBaseLine overrides MUI components' default style.
          Edit styles in 'theme.js' */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={inter.className}>
            {/* <ProtectedRoute> */}
              <div>
                {children}
              </div>
            {/* </ProtectedRoute> */}
          </body>
        </ThemeProvider>
    </html>
  );
}
