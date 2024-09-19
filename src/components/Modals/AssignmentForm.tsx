"use state"

import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';

import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import "../../app/globals.css"

export default function AssignmentForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    tone: '',
    condition: {
      name: '',
      description: '',
      duration: ''
    },
    personality_traits: {
      overall: '',
      introverted_extroverted: '',
      optimistic_pessimistic: '',
      decision_making_style: '',
      communication_style: ''
    },
    background_history: {
      early_life: '',
      key_life_events: '',
      current_life_situation: ''
    },
    relationships_social_context: {
      family: '',
      friends: '',
      work_school_environment: ''
    }
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNestedChange = (e: React.ChangeEvent<HTMLInputElement>, section: string, key: string) => {
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
    // Add your data submission logic here
    console.log('Form Data Submitted: ', formData);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default form submission behavior
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" className="button" onClick={handleOpen}>
        Create a new assignment
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-data-modal"
        aria-describedby="modal-for-creating-data"
      >
        <Box className="modal-form">
          <Typography variant="h6" component="h2">
            Create New Assignment
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Basic Details */}
            <TextField
              multiline
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'overall')}
            />

            {/* Condition */}
            <Typography variant="h6" sx={{ mt: 2 }}>Condition</Typography>
            <TextField
              multiline
              label="Overall Personality"
              name="personality_traits_overall"
              fullWidth
              margin="normal"
              value={formData.personality_traits.overall}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'overall')}
            />

            <Button type="submit" variant="contained" className="button" sx={{ mt: 2 }}>
              Save
            </Button>
          </form>
        </Box>
      </Modal>
      </LocalizationProvider>
    </div>
  );
}
