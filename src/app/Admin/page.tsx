"use client";

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";

// 'Create Assignment' button
export const MuiButton = () => {
    return (
        <div>
            <Button variant="contained" sx={{ width: '1000px' , height: '50px'}}>+ Create Assignment</Button>
        </div>
    )
}

export default function Admin() {
    return(
        <>
            <Header userName="username"/>
            <Box className="content-wrapper" sx={{ paddingTop: '80px' }}>
                <MuiButton></MuiButton>
            </Box>
        </>
        
    )
}
