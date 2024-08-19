import React from 'react'
import { useNavigate } from 'react-router-dom';
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
        <button className="header-button">LOGOUT</button>
      </div>
    </header>
  );
};

export default Header;