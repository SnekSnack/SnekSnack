import React from 'react'
import { Button, Typography } from '@mui/material';
import "@/app/globals.css"

export default function page() {
  return (
    <div className="content-wrapper-full">
      <Typography component="h1" variant="h5" className="my-10">Error 403: Access Forbidden</Typography>
      <Button className="button" href="/">Click here to return Home</Button>
    </div>
  )
}
