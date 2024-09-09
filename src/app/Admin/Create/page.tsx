// "use client";

// import { Box, Button } from "@mui/material";
// import Header from "@/components/Header";
// import "@/app/globals.css";


// export default function Admin() {
//     return(
//         <>
//             <Header userName="username"/>
//             <Box className="content-wrapper" sx={{ paddingTop: '80px' }}>
//                 <Button variant="contained" href="/Admin/Create" sx={{ width: '1000px' , height: '50px'}}>+ Create Assignment</Button>
//                 <Button variant="contained" href="/Admin/Manage" sx={{ width: '1000px' , height: '50px'}}>Manage Users</Button>
//             </Box>
//         </>
        
//     )
// }


// Assignment page
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
