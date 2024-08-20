import React, { useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'
import Link from 'next/link';

import "@/app/globals.css";

export default function AssignmentBar({ assignment }: any) {
	const [isOpen, setIsOpen] = useState(false);
  	const [isChatOpen, setIsChatOpen] = useState(false);
	
	const toggleDropdown = () => {
    	setIsOpen(!isOpen);
 	};

	const toggleChat = () => {
		setIsChatOpen(!isChatOpen);
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
				<Link href="/Chat" passHref>
					<Button>Chat Now</Button>
				</Link>
			</Box>
		)}
		</Box>
  )

  
}
