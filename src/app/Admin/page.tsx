import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css"


export default function Admin() {
    return(
        <>
            <Header userName="username"/>
            <Box className="content-wrapper" sx={{ paddingTop: '80px' }}>
                <Button variant="contained" sx={{ width: '1000px' , height: '50px'}}>+ Create Assignment</Button>
                <Button variant="contained" sx={{ width: '1000px' , height: '50px'}}>Manage Users</Button>
            </Box>
        </>
        
    )
}