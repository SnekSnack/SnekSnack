"use client"

import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonaForm from '@/components/Modals/PersonaForm';
import Header from '@/components/Header';
import "../../globals.css"

export default function AdminPage() {
  const [personas, setPersonas] = useState<any[]>([]); // List of personas
  const [selectedPersona, setSelectedPersona] = useState<any | null>(null); // For editing a persona
  const [isFormOpen, setIsFormOpen] = useState(false); // Open/Close the form modal

  // Open the modal to create or edit a persona
  const handleFormOpen = () => setIsFormOpen(true);
  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedPersona(null); // Reset the selected persona
  };

  // Handle form submit (add or edit persona)
  const handleFormSubmit = (newPersona: any) => {
    if (selectedPersona) {
      // Update existing persona
      setPersonas((prev) =>
        prev.map((persona) => (persona.id === newPersona.id ? newPersona : persona))
      );
    } else {
      // Add new persona
      setPersonas((prev) => [...prev, { ...newPersona, id: prev.length + 1 }]);
    }
    handleFormClose();
  };

  // Edit persona handler
  const handleEdit = (persona: any) => {
    setSelectedPersona(persona);
    handleFormOpen();
  };

  // Delete persona handler
  const handleDelete = (id: number) => {
    setPersonas((prev) => prev.filter((persona) => persona.id !== id));
  };

  return (
    <div>
    <Header userName="username"/>
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
              <TableCell>Occupation</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Personality</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personas.map((persona) => (
              <TableRow key={persona.id}>
                <TableCell>{persona.name}</TableCell>
                <TableCell>{persona.occupation}</TableCell>
                <TableCell>{persona.condition.name}</TableCell>
                <TableCell>{persona.personality_traits.overall}</TableCell>
                <TableCell>
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
		</Box>
    </div>
  );
}
