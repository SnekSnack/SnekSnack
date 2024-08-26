"use client";

import Link from 'next/link';
import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";
import HeaderBox from '@/components/HeaderBox';

// Create Assignment box
// Make it usable/useful somehow!!
// export const AssBox = () => {
//     return (
//         <div>
//             <Box
//             sx={{
//                 marginTop: 6,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 height: 700,
//                 width: "80%",
//                 bgcolor: "background.paper",
//                 borderRadius: 2,
//                 boxShadow: 24,
//                 p: 4,
//                 mx: "auto", 
//             }}
//             />
//         </div>
//     )
// }

// Testing HeaderBox Component
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

// export default function Assignment() {
//     return(
//         <>
//             <Header userName="username"/>
//             <Box
//             sx={{
//                 marginTop: 6,
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 height: 700,
//                 width: "80%",
//                 bgcolor: "background.paper",
//                 borderRadius: 2,
//                 boxShadow: 24,
//                 p: 4,
//                 mx: "auto", 
//             }}
//             >
//                 <Box>
//                     {/* Make link to pop-up later!! */}
//                     {/* <Link href="Login" className="hover:underline">Log Out</Link> */}
//                 </Box>
//             </Box>
        
//         </>
        
//     )
// }
