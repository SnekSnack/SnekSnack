"use client"

import React from 'react'
import Link from 'next/link';
import { Box, Button } from '@mui/material'
import "@/app/globals.css"

interface HeaderProps {
  userName: string;
}

// need to add a handle onclick to actually log them out

const Header: React.FC<HeaderProps> = ({ userName }) => {

  const handleLogOut = () => {
    // handle log out and aunthentication
    window.location.href = '/Login';
  };

  return (
    <header className="header">
      <Box>Hi, {userName}</Box>
      <Button onClick={handleLogOut}>Log Out</Button>
    </header>
  );
};

export default Header;