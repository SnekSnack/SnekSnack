"use client"

import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";
import React, { useState, useEffect } from 'react';
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

  const doNothing = () => { }

  useEffect(() => {
    getAssignments();
  }, []);

  const getAssignments = () => {
    api.get("/api/assignment/")
      .then((res) => res.data)
      .then((data) => {
        setAssignments(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deleteAssignment = (id: number) => {
    api
      .delete(`/api/assignment/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Assignment deleted!");
        else alert("Failed to delete Assignment.");
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

    // add/update assignment here

    handleFormClose();
    // check ig edit or create
    if (newAssignment.id == null) {
      createAssignment(newAssignment);
    }
    else {
      editAssignment(newAssignment);
    }
  };

  const handleChat = (assignment: any) => {
    setSelectedAssignment(assignment);
    handleChatOpen();
  };

  const handleEdit = (assignment: any) => {
    console.log(assignment);
    setSelectedAssignment(assignment);
    handleFormOpen();
  };

  const handleDelete = (assignment: any) => {
    // can we add a confirm delete
    deleteAssignment(assignment.id);

    // redundant since useeffect updates assignments
    //setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
  };

  return (
    <ProtectedRoute>
      <Header userName="username" />
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
                < TableRow key={assignment.id} >
                  <TableCell>{assignment.name}</TableCell>
                  <TableCell>{assignment.description}</TableCell>
                  <TableCell>{assignment.release_date}</TableCell>
                  <TableCell>{assignment.due_date}</TableCell>
                  <TableCell>{assignment.question_limit}</TableCell>
                  <TableCell>{assignment.persona}</TableCell>
                  <TableCell>
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
    </ProtectedRoute >
  );
}
