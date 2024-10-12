"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Button } from '@mui/material'
import "@/app/globals.css"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { Navigate } from 'react-router-dom';
import { useRouter } from 'next/navigation'
import api from "@/api.js";
interface HeaderProps {
  userName: string;
}

// need to add a handle onclick to actually log them out

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const router = useRouter();
  const [username, setUsername] = useState<any>(); // Store all assignments
  // top code broke it whoopsies
  // if group==1 or if it even exists then its an admin
  // yes its hard codey but we dont really have time anymore ._.

  const handleLogOut = () => {
    // handle log out and aunthentication
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    router.push("Login/");

  };

  useEffect(() => {
    getUsername();
  })

  const getUsername = () => {

    api.get("/api/header/")
      .then((res) => res.data)
      .then((data) => {
        setUsername(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  return (
    <header className="header">
      <Box>Hi, {username}</Box>
      <Button onClick={handleLogOut}>Log Out</Button>
    </header>
  );
};

export default Header;