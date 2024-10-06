"use client"

import { useState, useEffect } from "react";
//import { Navigate } from "react-router-dom";
import { useRouter } from 'next/navigation'
import { jwtDecode } from "jwt-decode";; // Assuming jwt-decode is installed
import api from "../api"; // Assuming api is properly set up
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants"; // Replace with actual values/constants

function ProtectedRoute({ children }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(null);

    // once root is opened check token
    useEffect(() => {
        // Ensure this only runs on the client side
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        // get refresh token
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            // give token to this root to get new token
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });
            // if successful set token 
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                router.push("/Login");
            }
        } catch (error) {

            router.push("/Login");
        }
    };

    // check if need to refresh 
    const auth = async () => {

        // check if token is available
        const token = localStorage.getItem(ACCESS_TOKEN);

        // if token doesnt exist redirect to login
        if (!token) {
            router.push("/Login");
            return;
        }

        // validate since token exists and isnt expired
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        // 1000 so its seconds not ms
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    // whilst waiting for states to approve return loading
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }
    if (!isAuthorized) {
        router.push("/Login");
        return null; // While redirecting, return nothing to avoid rendering protected content
    }
    return children; // Render the protected content if authorized
}

export default ProtectedRoute;