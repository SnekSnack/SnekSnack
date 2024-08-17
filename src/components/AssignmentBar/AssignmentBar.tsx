import React, { useState } from 'react'
import { Box, Button } from '@mui/material'

import "@/components/AssignmentBar/assignmentBar.css";

export default function AssignmentBar({ assignment }: any) {
	const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
		<Box className="w-full md:max-w-2xl">
    <Button onClick={toggleDropdown} className="row bar">
			{assignment.assignmentId}
    </Button>
		{isOpen && (
			<Box className="column dropdown gap-2">
				This is the dropdown content.
				<Button href={`/${assignment.id}`}>Chat Now</Button>
			</Box>
		)}
		</Box>
  )
}
