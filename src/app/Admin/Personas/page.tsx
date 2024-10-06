"use client"

import React, { useState, useEffect } from 'react';
import api from "@/api.js";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonaForm from '@/components/Modals/PersonaForm';
import Chat from '@/components/Modals/Chat';
import Header from '@/components/Header';
import "../../globals.css"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function AdminPage() {
  const [personas, setPersonas] = useState<any[]>([]); // List of personas
  const [selectedPersona, setSelectedPersona] = useState<any | null>(null); // For editing a persona
  const [isFormOpen, setIsFormOpen] = useState(false); // Open/Close the form modal
  const [isChatOpen, setIsChatOpen] = useState(false); // Open/Close modal

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = (event: any, reason: string) => {
    setIsChatOpen(false);
    setSelectedPersona(null);
  };

  const doNothing = () => { }

  useEffect(() => {
    getPersonas();
  }, []);

  const getPersonas = () => {
    console.log("TEST");
    api.get("/api/bots/") // is this right?
      .then((res) => res.data)
      .then((data) => {
        setPersonas(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deletePersona = (id: number) => {
    api
      .delete(`/api/bots/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Assignment deleted!");
        else alert("Failed to delete Assignment.");
        getPersonas();
      })
      .catch((error) => alert(error));
  };

  // Open the modal to create or edit a persona
  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedPersona(null); // Reset the selected persona
  };

  // Handle form submit (add or edit persona)
  const handleFormSubmit = (newPersona: any) => {

    // add update logic here

    handleFormClose();
  };

  const handleChat = (persona: any) => {
    setSelectedPersona(persona);
    handleChatOpen();
  };

  // Edit persona handler
  const handleEdit = (persona: any) => {
    setSelectedPersona(persona);
    handleFormOpen();
  };

  // Delete persona handler
  const handleDelete = (persona: any) => {

    deletePersona(persona.id);
  };

  return (
    <ProtectedRoute>
      <Header userName="username" />
      <Box className="content-wrapper">
        <Box className="row gap-4">
          <Button className="button" variant="contained" onClick={handleFormOpen}>
            Create a New Persona
          </Button>
          <Button className="button bg-white text-black" variant="contained" href="/Admin">
            Back to Assignments
          </Button>
        </Box>

        {/* Table for Personas */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Prompt</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personas.map((persona) => (
                <TableRow key={persona.id}>
                  <TableCell>{persona.name}</TableCell>
                  <TableCell>{persona.prompt}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleChat(persona)}>
                      <ChatIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(persona)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(persona.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Persona Form Modal */}
        {isFormOpen && (
          <PersonaForm
            open={isFormOpen}
            onClose={handleFormClose}
            onSubmit={handleFormSubmit}
            persona={selectedPersona} // Pass selected persona for editing
          />
        )}
        {isChatOpen && (
          <Chat
            open={isChatOpen}
            onClose={handleChatClose}
            onSubmit={doNothing}
            //assignment={null}
            persona={selectedPersona}
          />
        )}
      </Box>
    </ProtectedRoute>
  );
}
