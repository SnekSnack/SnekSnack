"use client";

import Link from 'next/link';
import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";
import HeaderBox from '@/components/HeaderBox';
import Dropdown from '@/components/Dropdown';

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
                    bgcolor: 'text.disabled',
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
                    bgcolor: 'text.disabled',
                    borderRadius: 2,
                    // boxShadow: 24,
                    p: 4,
                    mx: 'auto', // Horizontal centering
                    // textAlign: 'left',
                    }}
                >
                    <h1>Assignment name</h1>
                    {/* need to change this to a model not redirect to another page */}
                    <Link
                    className="hover:underline"
                    href="/Login"
                    >
                    Select release Date
                    </Link>
                </Box>
                <Box
                    sx={{
                        // marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        // alignItems: 'center',
                        height: '100%',
                        width: '100%',
                        // bgcolor: 'success.main',
                        borderRadius: 2,
                        // boxShadow: 24,
                        p: 4,
                        mx: 'auto', // Horizontal centering
                        // textAlign: 'left',
                        }}
                >
                    
                    {/* testing */}
                    {/* temporary dropdown code (before using the reusable) */}
                    {/* field 1 */}
                    <Box display="flex" alignItems= 'center'>
                        <Box 
                        sx = {{
                            width: "40%", 
                            }}
                        >
                            Question Limit
                        </Box>
                        <Box 
                        >
                            <Dropdown></Dropdown>
                        </Box>
                    </Box>
                    {/* field 2 */}
                    <Box display="flex" alignItems= 'center'>
                        <Box 
                        sx = {{
                            width: "40%", 
                            }}
                        >
                            Time Limit
                        </Box>
                        <Box 
                        >
                            <Dropdown></Dropdown>
                        </Box>
                    </Box>
                    {/* field 3 */}
                    <Box display="flex" alignItems= 'center'>
                        <Box 
                        sx = {{
                            width: "40%", 
                            }}
                        >
                            Assign To
                        </Box>
                        <Box 
                        >
                            <Dropdown></Dropdown>
                        </Box>
                    </Box>
                    {/* field 4 */}
                    <Box display="flex" alignItems= 'center'>
                        <Box 
                        sx = {{
                            width: "40%", 
                            }}
                        >
                            Patient
                        </Box>
                        <Box 
                        >
                            <Dropdown></Dropdown>
                        </Box>
                    </Box>

                    
                </Box>
                
            </Box>
    
        </>
        
    )
}


