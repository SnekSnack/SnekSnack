"use client"

import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";
import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentForm from '@/components/Modals/AssignmentForm';
import Chat from '@/components/Modals/Chat';
import Header from '@/components/Header';
import "../globals.css"
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter();
  const [assignments, setAssignments] = useState<any[]>([]); // Store all assignments
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null); // For editing
  const [isFormOpen, setIsFormOpen] = useState(false); // Open/Close modal
  const [isChatOpen, setIsChatOpen] = useState(false); // Open/Close modal
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Open/Close modal
 
  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = (event: any, reason: string) => {
    setIsChatOpen(false);
    setSelectedAssignment(null);
  };

  const viewSubmissions = (assignment: any) => {
    router.push(`/Admin/${assignment.id}`);
  }

  const doNothing = () => { }

  useEffect(() => {
    getAssignments();
    //getStudents();
  }, []);

  const getAssignments = () => {
    api.get("/api/assignment/")
      .then((res) => res.data)
      .then((data) => {
        const sortedData = data.sort((a: any, b: any) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
        setAssignments(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });


  };

  const deleteAssignment = (pk: number) => {
    api
      .delete(`/api/assignment/delete/${pk}/`)
      .then((res) => {
        //if (res.status === 204) alert("Assignment deleted!");
        if (res.status !== 204) alert("Failed to delete Assignment.");
        getAssignments();
      })
      .catch((error) => alert(error));
  };

  const createAssignment = (newAssignment: any) => {
    const data = {
      name: newAssignment.name,
      description: newAssignment.description,
      release_date: newAssignment.release_date.format('YYYY-MM-DD'),
      due_date: newAssignment.due_date.format('YYYY-MM-DD'),
      question_limit: newAssignment.question_limit,
      persona: parseInt(newAssignment.persona)
    };
    api.post(`/api/assignment/`, data)
      .then((res) => {
        getAssignments();
      })
      .catch((err) => alert(err));
  }

  const editAssignment = (newAssignment: any) => {
    // format the data to make sure its the correct type
    const data = {
      name: newAssignment.name,
      description: newAssignment.description,
      release_date: newAssignment.release_date.format('YYYY-MM-DD'),
      due_date: newAssignment.due_date.format('YYYY-MM-DD'),
      question_limit: newAssignment.question_limit,
      persona: parseInt(newAssignment.persona)
    };

    //.put changes all the variables
    api.put(`/api/assignment/edit/${newAssignment.id}/`, data)
      .then((res) => {
        getAssignments();
      })
      .catch((err) => alert(err));
  }

  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedAssignment(null);
  };

  const handleFormSubmit = (newAssignment: any) => {
    if (newAssignment.id == null) {
      createAssignment(newAssignment);
    }
    else {
      editAssignment(newAssignment);
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

  const handleDelete = (assignment: any) => {
    setSelectedAssignment(assignment);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedAssignment(null);
  }

  const handleConfirmDelete = () => {
    deleteAssignment(selectedAssignment.id);
    setOpenDeleteModal(false);
    setSelectedAssignment(null);
  }

  return (
    <>
    {/*<ProtectedRoute>*/}
      <Header isProtectedPage={true} />
      <Box className="content-wrapper">
        <Box className="row-space-between">
          <Box className="flex gap-4">
            <Button className="button" variant="contained" href="/Admin" disabled={true}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#414141', 
                },
              }}>
              Assignments
            </Button>
            <Button className="button" variant="contained" href="/Admin/Personas"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#414141', 
                },
              }}>
              AI Personas
            </Button>
          </Box>
          <Button className="button" variant="contained" onClick={handleFormOpen}>
            Create a New Assignment
          </Button>
        </Box>

        {/* Assignment Table */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{'#'}</TableCell>
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
                < TableRow key={assignment.id} >
                  <TableCell>{assignment.id}</TableCell>
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell>{assignment.description}</TableCell>
                  <TableCell>{assignment.release_date}</TableCell>
                  <TableCell>{assignment.due_date}</TableCell>
                  <TableCell>{assignment.question_limit}</TableCell>
                  <TableCell>{assignment.persona}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => viewSubmissions(assignment)}>
                      <GroupsIcon />
                    </IconButton>
                    <IconButton onClick={() => handleChat(assignment)}>
                      <MessageIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(assignment)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(assignment)}>
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
            personaId={selectedAssignment.persona}
          />
        )}

        {/* Delete confirmation */}
        <Modal
					open={openDeleteModal}
					onClose={() => setOpenDeleteModal(false)}
				>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: 400,
							bgcolor: 'background.paper',
							boxShadow: 24,
							p: 4,
							borderRadius: 2,
						}}
					>
						<Typography sx={{ mb: 3 }}>
							{`Are you sure you want to delete this assignment? This action is irreversible.`}
						</Typography>
            <Box className="row gap-4">
            <Button
							variant="contained"
							onClick={closeDeleteModal}
							fullWidth
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#777777', 
                },
              }}
						>
							Back
						</Button>
						<Button
							variant="contained"
							onClick={handleConfirmDelete}
							fullWidth
              sx={{
                backgroundColor: '#ac3232',
                '&:hover': {
                  backgroundColor: '#770101', 
                },
              }}
						>
							Delete
						</Button>
            </Box>
					</Box>
				</Modal>

      </Box>

    {/*</ProtectedRoute >*/}
    </>
  );
}
