"use client";

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";
import PersonaForm from "@/components/Modals/PersonaForm";
import AssignmentForm from "@/components/Modals/AssignmentForm";


export default function Admin() {
    return(
        <>
            <Header userName="username"/>
            <Box className="content-wrapper">
                <AssignmentForm/>
                <PersonaForm/>
            </Box>
        </>
        
    )
}
