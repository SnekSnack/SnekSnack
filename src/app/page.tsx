"use client"

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";

import '@/app/globals.css'

export default function Home() {

  return (
    <>
      <Header userName="username"/>

      <Box className="content-wrapper">
        <Button className="button" disabled={false} href="/Chat" variant="contained" color="primary">Start chat</Button>
        <Button className="button" disabled={true} variant="contained" color="primary">Download chat transcript</Button>
      </Box>
    </>
  );
}
