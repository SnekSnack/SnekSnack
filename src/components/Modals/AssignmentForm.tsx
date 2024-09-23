import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import "../../app/globals.css";
import { SelectChangeEvent } from '@mui/material';
import api from "@/api.js";

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
    question_limit: 10,
    persona: '',
  });

  // const createAss = () => {
  //   api
  //     .post("/api/assignment/", { formData })
  //     .then((res) => {
  //       if (res.status === 201) alert("Note created!");
  //       else alert("Failed to make note.");
  //     })
  //     .catch((err) => alert(err));
  // };

  // const editAss = () => {
  //   api
  //     .patch(`/api/assignment/edit/${formData.id}`, { formData })
  //     .then((res) => {
  //       if (res.status === 201) alert("Note created!");
  //       else alert("Failed to make note.");
  //     })
  //     .catch((err) => alert(err));
  // };

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
        question_limit: 10,
        persona: '',
      });
    }
  }, [assignment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "question_limit") {
      const intValue = Math.floor(Number(value)); // Convert to integer
      setFormData((prev) => ({ ...prev, [name]: intValue >= 0 ? intValue : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
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
              id="name"
              label="Name"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              id="description"
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
                id="release_date"
                label="Release Date"
                name="release_date"
                value={formData.release_date}
                onChange={(date) => handleDateChange(date, 'release_date')}
              />

              <DateField
                id="due_date"
                label="Due Date"
                name="due_date"
                value={formData.due_date}
                onChange={(date) => handleDateChange(date, 'due_date')}
              />
            </Box>

            <TextField
              id="question_limit"
              label="Question Limit"
              name="question_limit"
              fullWidth
              multiline
              margin="normal"
              value={formData.question_limit}
              onChange={handleChange}
              type="number" // Restrict to number input
              inputProps={{ min: "0", step: "1" }}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="persona-select-label">Persona</InputLabel>
              <Select
                id="persona"
                labelId="persona-select-label"
                name="persona"
                value={formData.persona}
                onChange={handleSelectChange}
              >
                <MenuItem value="1">Persona 1</MenuItem>
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
