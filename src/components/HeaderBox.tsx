import React from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

// Define the props type
interface HeaderBoxProps {
  title: string;
  buttonText: string;
  buttonLink: string;
}

// INSTEAD OF THE BUTTON TAKING UP THE WHOLE COLUMN
// SHOULD BE INSIDE HEADER AND HEADER IS CONTAINED WITHIN ANOTHER BOX
const HeaderBox: React.FC<HeaderBoxProps> = ({ title, buttonText, buttonLink }) => {
  return (
    <Box
      sx={{
        marginTop: 4,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        height: 500,
        width: '80%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 24,
        p: 4,
        mx: 'auto', // Horizontal centering
        // textAlign: 'left',
      }}
    >
      <h1>{title}</h1>
      <Link
        className="hover:underline"
        href={buttonLink}
      >
        {buttonText}
      </Link>
    </Box>
  );
};

export default HeaderBox;
