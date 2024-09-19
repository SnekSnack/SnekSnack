import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Typography } from '@mui/material';
import "../../app/globals.css"

export default function PersonaForm() {
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
      <Button variant="contained" className="button" onClick={handleOpen}>
        Create a new patient
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="create-data-modal"
        aria-describedby="modal-for-creating-data"
      >
        <Box className="modal-form">
          <Typography variant="h6" component="h2">
            Create New Patient
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
              onChange={handleChange}
            />
            <TextField
            multiline
              label="Age"
              name="age"
              fullWidth
              margin="normal"
              value={formData.age}
              onChange={handleChange}
            />
            <TextField
            multiline
              label="Gender"
              name="gender"
              fullWidth
              margin="normal"
              value={formData.gender}
              onChange={handleChange}
            />
            <TextField
            multiline
              label="Occupation"
              name="occupation"
              fullWidth
              margin="normal"
              value={formData.occupation}
              onChange={handleChange}
            />
            <TextField
            multiline
              label="Tone"
              name="tone"
              fullWidth
              margin="normal"
              value={formData.tone}
              onChange={handleChange}
            />

            {/* Condition */}
            <Typography variant="h6" sx={{ mt: 2 }}>Condition</Typography>
            <TextField
            multiline
              label="Condition Name"
              name="condition_name"
              fullWidth
              margin="normal"
              value={formData.condition.name}
              onChange={(e) => handleNestedChange(e, 'condition', 'name')}
            />
            <TextField
            multiline
              label="Condition Description"
              name="condition_description"
              fullWidth
              margin="normal"
              value={formData.condition.description}
              onChange={(e) => handleNestedChange(e, 'condition', 'description')}
            />
            <TextField
            multiline
              label="Duration (months)"
              name="condition_duration"
              fullWidth
              margin="normal"
              value={formData.condition.duration}
              onChange={(e) => handleNestedChange(e, 'condition', 'duration')}
            />

            {/* Personality Traits */}
            <Typography variant="h6" sx={{ mt: 2 }}>Personality Traits</Typography>
            <TextField
              multiline
              label="Overall Personality"
              name="personality_traits_overall"
              fullWidth
              margin="normal"
              value={formData.personality_traits.overall}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'overall')}
            />
            <TextField
            multiline
              label="Introverted or Extroverted"
              name="personality_traits_introverted_extroverted"
              fullWidth
              margin="normal"
              value={formData.personality_traits.introverted_extroverted}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'introverted_extroverted')}
            />
            <TextField
            multiline
              label="Optimistic or Pessimistic"
              name="personality_traits_optimistic_pessimistic"
              fullWidth
              margin="normal"
              value={formData.personality_traits.optimistic_pessimistic}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'optimistic_pessimistic')}
            />
            <TextField
            multiline
              label="Decision Making Style"
              name="personality_traits_decision_making_style"
              fullWidth
              margin="normal"
              value={formData.personality_traits.decision_making_style}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'decision_making_style')}
            />
            <TextField
            multiline
              label="Communication Style"
              name="personality_traits_communication_style"
              fullWidth
              margin="normal"
              value={formData.personality_traits.communication_style}
              onChange={(e) => handleNestedChange(e, 'personality_traits', 'communication_style')}
            />

            {/* Background History */}
            <Typography variant="h6" sx={{ mt: 2 }}>Background History</Typography>
            <TextField
            multiline
              label="Early Life"
              name="background_history_early_life"
              fullWidth
              margin="normal"
              value={formData.background_history.early_life}
              onChange={(e) => handleNestedChange(e, 'background_history', 'early_life')}
            />
            <TextField
            multiline
              label="Key Life Events"
              name="background_history_key_life_events"
              fullWidth
              margin="normal"
              value={formData.background_history.key_life_events}
              onChange={(e) => handleNestedChange(e, 'background_history', 'key_life_events')}
            />
            <TextField
            multiline
              label="Current Life Situation"
              name="background_history_current_life_situation"
              fullWidth
              margin="normal"
              value={formData.background_history.current_life_situation}
              onChange={(e) => handleNestedChange(e, 'background_history', 'current_life_situation')}
            />

            {/* Relationships and Social Context */}
            <Typography variant="h6" sx={{ mt: 2 }}>Relationships & Social Context</Typography>
            <TextField
            multiline
              label="Family"
              name="relationships_social_context_family"
              fullWidth
              margin="normal"
              value={formData.relationships_social_context.family}
              onChange={(e) => handleNestedChange(e, 'relationships_social_context', 'family')}
            />
            <TextField
            multiline
              label="Friends"
              name="relationships_social_context_friends"
              fullWidth
              margin="normal"
              value={formData.relationships_social_context.friends}
              onChange={(e) => handleNestedChange(e, 'relationships_social_context', 'friends')}
            />
            <TextField
            multiline
              label="Work/School Environment"
              name="relationships_social_context_work_school_environment"
              fullWidth
              margin="normal"
              value={formData.relationships_social_context.work_school_environment}
              onChange={(e) => handleNestedChange(e, 'relationships_social_context', 'work_school_environment')}
            />

            <Button type="submit" variant="contained" className="button" sx={{ mt: 2 }}>
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
