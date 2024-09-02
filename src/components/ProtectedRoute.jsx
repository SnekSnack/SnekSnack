import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

// wrapper for protected route so the you need authentication token to access

// re routes the unauthenticated to login
function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    // once root is opened check token
    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])


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
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        }
        // when in doubt just deny 
        catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    // check if need to refresh 
    const auth = async () => {

        // check if token is available
        const token = localStorage.getItem(ACCESS_TOKEN);

        // if token doesnt exist redirect to login
        if (!token) {
            setIsAuthorized(false);
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

    // return to the wrapped page or the login page
    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;

