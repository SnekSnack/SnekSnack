import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import "../../app/globals.css";

interface PersonaFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (persona: any) => void;
  persona?: any; // Optional, used for editing
}

export default function PersonaForm({ open, onClose, onSubmit, persona }: PersonaFormProps) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    prompt: '',
  });

  // Populate the form with selected persona data for editing
  useEffect(() => {
    if (persona) {
      setFormData(persona);
    } else {
      setFormData({
        id: null,
        name: '',
        prompt: '',
      });
    }
  }, [persona]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, key: string) => {
    const { value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to the parent
    onClose(); // Close the modal after submission
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-form">
        <Typography variant="h6" component="h2">
          {persona ? 'Edit Persona' : 'Create New Persona'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth multiline
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            label="Prompt"
            name="prompt"
            fullWidth multiline
            margin="normal"
            value={formData.prompt}
            onChange={handleChange}
          />
          <Box className="row-space-between">
            <Box/>
            <Button type="submit" variant="contained" className="button" sx={{ mt: 2 }}>
              {persona ? 'Update' : 'Save'}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
}
