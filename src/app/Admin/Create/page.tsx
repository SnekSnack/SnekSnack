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
            <HeaderBox
                title="Assignment name" 
                buttonText="Select release Date" 
                buttonLink="Login" // Temporary redirect
            />
        </>
        
    )
}


