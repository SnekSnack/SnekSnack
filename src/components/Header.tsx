"use client"

import React from 'react'
import Link from 'next/link';
import { Box, Button } from '@mui/material'
import "@/app/globals.css"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { Navigate } from 'react-router-dom';
interface HeaderProps {
  userName: string;
}

// need to add a handle onclick to actually log them out

const Header: React.FC<HeaderProps> = ({ userName }) => {

  const handleLogOut = () => {
    // handle log out and aunthentication
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
    <Navigate to="/Login" />;
  };

  return (
    <header className="header">
      <Box>Hi, {userName}</Box>
      <Button onClick={handleLogOut}>Log Out</Button>
    </header>
  );
};

export default Header;