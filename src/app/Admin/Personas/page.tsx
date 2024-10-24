"use client"

import React, { useState, useEffect } from 'react';
import api from "@/api.js";
import { Box, Button, Modal, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
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
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Open/Close modal

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
    api.get("/api/bots/") // is this right?
      .then((res) => res.data)
      .then((data) => {
        const sortedData = data.sort((a: any, b: any) => b.id - a.id);
        setPersonas(sortedData);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const deletePersona = (pk: number) => {
    api
      .delete(`/api/bots/delete/${pk}/`)
      .then((res) => {
        //if (res.status === 204) alert("AI Persona deleted!");
        if (res.status !== 204) alert("Failed to delete AI Persona.");
        getPersonas();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const editPersona = (newPersona: any) => {
    // EL PLS FIX THIs
    api.put(`/api/bots/edit/${newPersona.id}/`, newPersona)
      .then((res) => {
        getPersonas();
      })
      .catch((err) => alert(err));
  }


  // Open the modal to create or edit a persona
  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedPersona(null); // Reset the selected persona
  };
  const createPersona = (newPersona: any) => {
    api.post(`/api/bots/`, newPersona)
      .then((res) => {
        getPersonas();
      })
      .catch((err) => alert(err));
  }

  // Handle form submit (add or edit persona)
  const handleFormSubmit = (newPersona: any) => {
    if (newPersona.id == null) {
      createPersona(newPersona);
    }
    else {
      editPersona(newPersona);
    }
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

  const handleDelete = (persona: any) => {
    setSelectedPersona(persona);
    console.log(persona);
    console.log(persona.id);
    setOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedPersona(null);
  }

  const handleConfirmDelete = () => {
    deletePersona(selectedPersona.id);
    setOpenDeleteModal(false);
    setSelectedPersona(null);
  }


  return (
    <ProtectedRoute>
      <Header isProtectedPage={true} />
      <Box className="content-wrapper">
        <Box className="row-space-between">
          <Box className="flex gap-4">
            <Button className="button" variant="contained" href="/Admin"
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#414141',
                },
              }}>
              Assignments
            </Button>
            <Button className="button" variant="contained" href="/Admin/Personas" disabled={true}
              sx={{
                backgroundColor: 'white',
                color: 'black',
                '&:hover': {
                  backgroundColor: '#414141',
                },
              }}>
              AI Personas
            </Button>
          </Box >
          <Button className="button" variant="contained" onClick={handleFormOpen}>
            Create a New Persona
          </Button>
        </Box >

        {/* Table for Personas */}
        < TableContainer component={Paper} sx={{ marginTop: 2 }
        }>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{'#'}</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Prompt</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personas.map((persona) => (
                <TableRow key={persona.id}>
                  <TableCell>{persona.id}</TableCell>
                  <TableCell>{persona.name}</TableCell>
                  <TableCell>{persona.prompt}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleChat(persona)}>
                      <ChatIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(persona)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(persona)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer >

        {/* Persona Form Modal */}
        {
          isFormOpen && (
            <PersonaForm
              open={isFormOpen}
              onClose={handleFormClose}
              onSubmit={handleFormSubmit}
              persona={selectedPersona} // Pass selected persona for editing
            />
          )
        }
        {
          isChatOpen && (
            <Chat
              open={isChatOpen}
              onClose={handleChatClose}
              onSubmit={doNothing}
              //assignment={null}
              personaId={selectedPersona.id}
              test={true}
            />
          )
        }

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
              {`Are you sure you want to delete this AI persona? This action is irreversible.`}
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

      </Box >
    </ProtectedRoute >
  );
}
