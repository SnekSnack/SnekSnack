import React, { useState } from 'react'
import { Box, Button, Modal, Typography } from '@mui/material'

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
				<Button onClick={toggleChat}>Chat Now</Button>
			</Box>
		)}
		<Modal
        open={isChatOpen}
        onClose={toggleChat}
        aria-labelledby="chat-title"
        aria-describedby="chat-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
		  height: 700,
          width: 1000,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="chat-title" variant="h6" component="h2">
            Chat Window
          </Typography>
          <Typography id="chat-description" sx={{ mt: 2 }}>
            This is where the chat messages will go.
          </Typography>
          <Button onClick={toggleChat} sx={{ mt: 2 }}>Close Chat</Button>
        </Box>
      </Modal>
		</Box>
  )

  
}
