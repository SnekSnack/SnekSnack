import React from 'react'
import Link from 'next/link';
import { Box } from '@mui/material'
import "@/app/globals.css"

interface HeaderProps {
  userName: string;
}


// need to add a handle onclick to actually log them out

const Header: React.FC<HeaderProps> = ({ userName }) => {

  return (
    <header className="header">
      <Box>Hi, {userName}</Box>
      <Link href="Login" className="hover:underline">Log Out</Link>
    </header>
  );
};

export default Header;