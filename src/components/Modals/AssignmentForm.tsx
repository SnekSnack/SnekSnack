import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import "../../app/globals.css";

interface AssignmentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (assignment: any) => void;
  assignment?: any; // For editing an assignment
}

export default function AssignmentForm({ open, onClose, onSubmit, assignment }: AssignmentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    release_date: dayjs(),
    due_date: dayjs(),
    question_limit: '',
    persona: '',
  });

  useEffect(() => {
    if (assignment) {
      setFormData({
        ...assignment,
        release_date: dayjs(assignment.release_date),
        due_date: dayjs(assignment.due_date),
      });
    } else {
      setFormData({
        name: '',
        description: '',
        release_date: dayjs(),
        due_date: dayjs(),
        question_limit: '',
        persona: '',
      });
    }
  }, [assignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Modal open={open} onClose={onClose}>
      <Box className="modal-form">
        <Typography variant="h6" component="h2">
          {assignment ? 'Edit Assignment' : 'Create New Assignment'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            fullWidth
            margin="normal"
            value={formData.description}
            onChange={handleChange}
          />

          <Box className="row gap-10">
            <DateField
              label="Release Date"
              name="release_date"
              value={formData.release_date}
              onChange={(date) => handleDateChange(date, 'release_date')}
            />

            <DateField
              label="Due Date"
              name="due_date"
              value={formData.due_date}
              onChange={(date) => handleDateChange(date, 'due_date')}
            />
          </Box>

          <TextField
            label="Question Limit"
            name="question_limit"
            fullWidth multiline
            margin="normal"
            value={formData.question_limit}
            onChange={handleChange}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="persona-select-label">Persona</InputLabel>
            <Select
              labelId="persona-select-label"
              name="persona"
              value={formData.persona}
              onChange={handleChange}
            >
              <MenuItem value="persona1">Persona 1</MenuItem>
              <MenuItem value="persona2">Persona 2</MenuItem>
              <MenuItem value="persona3">Persona 3</MenuItem>
            </Select>
          </FormControl>

          <Button className="button" type="submit" variant="contained" sx={{ mt: 2 }}>
            {assignment ? 'Update' : 'Save'}
          </Button>
        </form>
      </Box>
    </Modal>
    </LocalizationProvider>
  );
}
