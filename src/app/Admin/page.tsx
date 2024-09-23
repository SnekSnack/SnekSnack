"use client"

import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentForm from '@/components/Modals/AssignmentForm';
import Chat from '@/components/Modals/Chat';
import Header from '@/components/Header';
import "../globals.css"

export default function AdminPage() {
  const [assignments, setAssignments] = useState<any[]>([]); // Store all assignments
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null); // For editing
  const [isFormOpen, setIsFormOpen] = useState(false); // Open/Close modal
  const [isChatOpen, setIsChatOpen] = useState(false); // Open/Close modal

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = (event: any, reason: string) => {
    setIsChatOpen(false);
    setSelectedAssignment(null);
  };

  const doNothing = () => {}

  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedAssignment(null);
  };

  const handleFormSubmit = (newAssignment: any) => {
    if (selectedAssignment) {
      // Update existing assignment
      setAssignments((prev) =>
        prev.map((assignment) => (assignment.id === newAssignment.id ? newAssignment : assignment))
      );
    } else {
      // Add new assignment
      setAssignments((prev) => [...prev, { ...newAssignment, id: prev.length + 1 }]);
    }
    handleFormClose();
  };

  const handleChat = (assignment: any) => {
    setSelectedAssignment(assignment);
    handleChatOpen();
  };

  const handleEdit = (assignment: any) => {
    setSelectedAssignment(assignment);
    handleFormOpen();
  };

  const handleDelete = (id: number) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
  };

  return (
    <div>
    <Header userName="username"/>
    <Box className="content-wrapper">
			<Box className="row gap-4">
      <Button className="button" variant="contained" onClick={handleFormOpen}>
        Create a New Assignment
      </Button>
			<Button className="button bg-white text-black" variant="contained" href="/Admin/Personas">
        Manage Personas
      </Button>
			</Box>

      {/* Assignment Table */}
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Release Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Question Limit</TableCell>
              <TableCell>Persona</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.name}</TableCell>
                <TableCell>{assignment.description}</TableCell>
                <TableCell>{assignment.release_date.format('YYYY-MM-DD')}</TableCell>
                <TableCell>{assignment.due_date.format('YYYY-MM-DD')}</TableCell>
                <TableCell>{assignment.question_limit}</TableCell>
                <TableCell>{assignment.persona}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleChat(assignment)}>
                    <ChatIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(assignment)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(assignment.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Assignment Form */}
      {isFormOpen && (
        <AssignmentForm
          open={isFormOpen}
          onClose={handleFormClose}
          onSubmit={handleFormSubmit}
          assignment={selectedAssignment}
        />
      )}
      {isChatOpen && (
        <Chat
          open={isChatOpen}
          onClose={handleChatClose}
          onSubmit={doNothing}
          assignment={selectedAssignment}
          persona={selectedAssignment.persona}
        />
      )}
    </Box>
    </div>
  );
}
