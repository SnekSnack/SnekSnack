"use client"
import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css"
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
    const [bots, setBots] = useState([]);
    const router = useRouter();

    // on load get bots
    useEffect(() => {
        getBots();
    }, []);

    // function to get item
    const getBots = () => {
        api.get("/api/bots/")
            .then((res) => {
                if (res.status == 403) {
                    // Redirect to the forbidden page if 403
                    router.push('/403');
                } else {
                    return res.data;
                }
            })
            .then((data) => {
                if (data) {
                    setBots(data);
                    console.log(data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };
    return (
        <ProtectedRoute>
            <Header userName="username" />
            <Box className="content-wrapper" sx={{ paddingTop: '80px' }}>
                {/* in theory they shouldnt get access to the data */}

            </Box>
        </ProtectedRoute>
    )


    // 
}
