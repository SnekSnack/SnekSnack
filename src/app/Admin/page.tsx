"use client";

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";


export default function Admin() {
    return(
        <>
            <Header userName="username"/>
            <Box className="content-wrapper" sx={{ paddingTop: '60px', gap: 1 }}>
                <Button variant="contained" href="/Admin/Create" sx={{ width: '1000px' , height: '50px'}}>+ Create Assignment</Button>
                <Button variant="contained" href="/Admin/Manage" sx={{ width: '1000px' , height: '50px'}}>Manage Users</Button>
            </Box>
        </>
        
    )
}
