"use client"

import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material'
import "@/app/globals.css"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useRouter } from 'next/navigation'
import api from "@/api.js";
import Image from 'next/image';
interface HeaderProps {
  isProtectedPage: boolean;
}

const Header: React.FC<HeaderProps> = ({ isProtectedPage }) => {
  const router = useRouter();
  const [username, setUsername] = useState<any[]>([]);

  const handleLogOut = () => {
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    router.push("Login/");
  };

  useEffect(() => {
    if (isProtectedPage) {
      api.get("/api/header/")
				.then((res) => res.data)
				.then((data) => {
					if (data.groups.length>0) {
						console.log("Page load success")
					} else {
						console.log("Access Forbidden")
						router.push("/");
					}
					console.log(data);
				})
				.catch((err) => {
					console.error(err);
				});
    }
    getUsername();
  }, [])

  const getUsername:any = () => {

    api.get("/api/header/")
      .then((res) => res.data)
      .then((data) => {
        setUsername(data.username);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  return (
    <header className="header">
      <Box>Hi, {username}</Box>
      <Box className="flex gap-5">
        <Image
          src='/deakinsmall.png'
          alt="Deakin Logo"
          width={100}  
          height={75}
          />
        <Button onClick={handleLogOut}
          sx={{
            backgroundColor: 'white',
            color: 'black',
            '&:hover': {
              backgroundColor: '#414141', 
            },
          }}
        >Log Out</Button>
      </Box>
    </header>
  );
};

export default Header;