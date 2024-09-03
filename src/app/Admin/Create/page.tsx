import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css"


export default function Admin() {
    return(
        <>
            <Header userName="username"/>
            <Box className="content-wrapper" sx={{ paddingTop: '80px' }}>
                create assignment
            </Box>
        </>
        
    )
}