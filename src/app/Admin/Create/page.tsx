"use client";

import Link from 'next/link';
import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";
import HeaderBox from '@/components/HeaderBox';

export default function Assignment() {
    return(
        <>
            <Header userName="username"/>
            {/* Stuff copied from HeaderBox bc idk how to put contents into the box rn */}
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    // alignItems: 'center',
                    height: 500,
                    width: '80%',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 24,
                    // p: 4,
                    mx: 'auto', 
                }}
                >
                    <Box
                    sx={{
                    // marginTop: 4,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 65,
                    width: '100%',
                    bgcolor: 'text.secondary',
                    borderRadius: 2,
                    // boxShadow: 24,
                    p: 4,
                    mx: 'auto', // Horizontal centering
                    // textAlign: 'left',
                    }}
                >
                    <h1>Assignment name</h1>
                    <Link
                    className="hover:underline"
                    href="/Login"
                    >
                    Select release Date
                    </Link>
                </Box>
                <div>Heloooo</div>
            </Box>
    
            {/* <HeaderBox
                title="Assignment name" 
                buttonText="Select release Date" 
                buttonLink="Login" // Temporary redirect
            >
                <div>Heloooo</div>
            </HeaderBox> */}
        </>
        
    )
}


