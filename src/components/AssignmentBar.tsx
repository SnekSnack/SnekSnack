import React, { useState } from 'react'
import { Box, Button } from '@mui/material'

import "@/app/globals.css";

export default function AssignmentBar({ assignment }: any) {
	const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
		<Box className="w-full md:max-w-2xl">
    <Button onClick={toggleDropdown} className="row"
			sx={{
				color: 'black',
				boxShadow: 3,
				borderRadius: 2,
				backgroundColor: 'white',
			}}
		>
			{assignment.assignmentId}
    </Button>
		{isOpen && (
			<Box className="column"
				sx={{
					color: 'black',
					// boxShadow: 3,
					borderRadius: 2,
					backgroundColor: '#cccccc',
				}}
			>
				This is the dropdown content.
				<Button href={`/${assignment.id}`}>Chat Now</Button>
			</Box>
		)}
		</Box>
  )
}
