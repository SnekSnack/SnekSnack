"use client"

import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";
import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentForm from '@/components/Modals/AssignmentForm';
import Header from '@/components/Header';
import "../globals.css"

export default function AdminPage() {
  const [assignments, setAssignments] = useState<any[]>([]); // Store all assignments
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null); // For editing
  const [isFormOpen, setIsFormOpen] = useState(false); // Open/Close modal


  useEffect(() => {
    getAss();
  }, []);

  // function to get item
  const getAss = () => {
    console.log("TEST");
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

  const deleteAss = (id: number) => {
    api
      .delete(`/api/assignment/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Assignment deleted!");
        else alert("Failed to delete Assignment.");
        getAss();
      })
      .catch((error) => alert(error));
  };

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

  const handleEdit = (assignment: any) => {
    setSelectedAssignment(assignment);
    handleFormOpen();
  };

  const handleDelete = (id: number) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
    deleteAss(id);
  };

  return (
    <div>
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
                <TableRow key={assignment.id}>
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
      </Box>
    </div>
  );
}



/*"use client";

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css";
import PersonaForm from "@/components/Modals/PersonaForm";
import AssignmentForm from "@/components/Modals/AssignmentForm";


export default function Admin() {
    return(
        <>
            <Header userName="username"/>
            <Box className="content-wrapper">
                <AssignmentForm/>
                <PersonaForm/>
            </Box>
        </>
        
    )
}
*/