import React from 'react'
import Link from 'next/link';
import { Box } from '@mui/material'
import "@/app/globals.css"



interface HeaderProps {
  userName: string;
}


const Header: React.FC<HeaderProps> = ({ userName }) => {

  return (
    <header className="header">
      <button className="header-button">HOME</button>
      <div className="header-right">
        <span className="header-message">Hi, NAME {userName}</span>
        <Link href="/Login" passHref>
          <button className="header-button">LOGOUT</button>
        </Link> 
      </div>
    </header>
  );
};

export default Header;