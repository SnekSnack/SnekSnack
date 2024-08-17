import React, { useState } from 'react'
import { Box, Button } from '@mui/material'

interface AssignmentBarProps {
	assignment: Object;
}

/**        <Link href={`/${chat.id}`}>
          {chat.assignmentId}
        </Link> */


export default function AssignmentBar({ assignment }: any) {
	const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
		<>
    <Button onClick={toggleDropdown}>
			AssignmentBar
    </Button>
		{isOpen && (
			<Box style={{
				marginTop: '10px',
				padding: '20px',
				backgroundColor: '#f0f0f0',
				borderRadius: '5px',
				boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
			}}>
				This is the dropdown content.
			</Box>
		)}
		</>
  )
}
