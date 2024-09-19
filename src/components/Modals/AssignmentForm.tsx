import React, { useState } from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField, TimeField } from '@mui/x-date-pickers';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import "../../app/globals.css";

export default function AssignmentForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    release_date: dayjs(),
    due_date: dayjs(),
    question_limit: '',
    persona: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDateChange = (date: dayjs.Dayjs | null, name: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: date
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form Data Submitted: ', formData);
    handleClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
              {/* Name */}
              <TextField
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
              />

              {/* Description */}
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
                {/* Release Date */}
                <DateField
                  label="Release Date"
                  name="release_date"
                  value={formData.release_date}
                  onChange={(date) => handleDateChange(date, 'release_date')}
                  //renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />

                {/* Due Date */}
                <DateField
                  label="Due Date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={(date) => handleDateChange(date, 'due_date')}
                  //renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                />
              </Box>

              {/* Question Limit */}
              <TextField
                label="Question Limit"
                name="question_limit"
                fullWidth
                margin="normal"
                value={formData.question_limit}
                onChange={handleChange}
              />

              {/* Persona Select */}
              <FormControl fullWidth margin="normal">
                <InputLabel id="persona-select-label">Persona</InputLabel>
                <Select
                  labelId="persona-select-label"
                  name="persona"
                  value={formData.persona}
                  onChange={handleChange}
                >
                  {/* fetch personas and list menuitem for each */}
                  <MenuItem value="persona1">Persona 1</MenuItem>
                  <MenuItem value="persona2">Persona 2</MenuItem>
                  <MenuItem value="persona3">Persona 3</MenuItem>
                </Select>
              </FormControl>

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
