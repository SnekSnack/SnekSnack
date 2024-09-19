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

  // Populate the form with selected persona data for editing
  useEffect(() => {
    if (persona) {
      setFormData(persona);
    } else {
      setFormData({
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
            label="Age"
            name="age"
            fullWidth multiline
            margin="normal"
            value={formData.age}
            onChange={handleChange}
          />
          <TextField
            label="Gender"
            name="gender"
            fullWidth multiline
            margin="normal"
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            label="Occupation"
            name="occupation"
            fullWidth multiline
            margin="normal"
            value={formData.occupation}
            onChange={handleChange}
          />
          <TextField
            label="Tone"
            name="tone"
            fullWidth multiline
            margin="normal"
            value={formData.tone}
            onChange={handleChange}
          />

          {/* Condition */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Condition
          </Typography>
          <TextField
            label="Condition Name"
            name="condition_name"
            fullWidth multiline
            margin="normal"
            value={formData.condition.name}
            onChange={(e) => handleNestedChange(e, 'condition', 'name')}
          />
          <TextField
            label="Condition Description"
            name="condition_description"
            fullWidth multiline
            margin="normal"
            value={formData.condition.description}
            onChange={(e) => handleNestedChange(e, 'condition', 'description')}
          />
          <TextField
            label="Duration (months)"
            name="condition_duration"
            fullWidth multiline
            margin="normal"
            value={formData.condition.duration}
            onChange={(e) => handleNestedChange(e, 'condition', 'duration')}
          />

          {/* Personality Traits */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Personality Traits
          </Typography>
          <TextField
            label="Overall Personality"
            name="personality_traits_overall"
            fullWidth multiline
            margin="normal"
            value={formData.personality_traits.overall}
            onChange={(e) => handleNestedChange(e, 'personality_traits', 'overall')}
          />
          <TextField
            label="Introverted or Extroverted"
            name="personality_traits_introverted_extroverted"
            fullWidth multiline
            margin="normal"
            value={formData.personality_traits.introverted_extroverted}
            onChange={(e) => handleNestedChange(e, 'personality_traits', 'introverted_extroverted')}
          />
          <TextField
            label="Optimistic or Pessimistic"
            name="personality_traits_optimistic_pessimistic"
            fullWidth multiline
            margin="normal"
            value={formData.personality_traits.optimistic_pessimistic}
            onChange={(e) => handleNestedChange(e, 'personality_traits', 'optimistic_pessimistic')}
          />
          <TextField
            label="Decision Making Style"
            name="personality_traits_decision_making_style"
            fullWidth multiline
            margin="normal"
            value={formData.personality_traits.decision_making_style}
            onChange={(e) => handleNestedChange(e, 'personality_traits', 'decision_making_style')}
          />
          <TextField
            label="Communication Style"
            name="personality_traits_communication_style"
            fullWidth multiline
            margin="normal"
            value={formData.personality_traits.communication_style}
            onChange={(e) => handleNestedChange(e, 'personality_traits', 'communication_style')}
          />

          {/* Background History */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Background History
          </Typography>
          <TextField
            label="Early Life"
            name="background_history_early_life"
            fullWidth multiline
            margin="normal"
            value={formData.background_history.early_life}
            onChange={(e) => handleNestedChange(e, 'background_history', 'early_life')}
          />
          <TextField
            label="Key Life Events"
            name="background_history_key_life_events"
            fullWidth multiline
            margin="normal"
            value={formData.background_history.key_life_events}
            onChange={(e) => handleNestedChange(e, 'background_history', 'key_life_events')}
          />
          <TextField
            label="Current Life Situation"
            name="background_history_current_life_situation"
            fullWidth multiline
            margin="normal"
            value={formData.background_history.current_life_situation}
            onChange={(e) => handleNestedChange(e, 'background_history', 'current_life_situation')}
          />

          {/* Relationships and Social Context */}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Relationships & Social Context
          </Typography>
          <TextField
            label="Family"
            name="relationships_social_context_family"
            fullWidth multiline
            margin="normal"
            value={formData.relationships_social_context.family}
            onChange={(e) => handleNestedChange(e, 'relationships_social_context', 'family')}
          />
          <TextField
            label="Friends"
            name="relationships_social_context_friends"
            fullWidth multiline
            margin="normal"
            value={formData.relationships_social_context.friends}
            onChange={(e) => handleNestedChange(e, 'relationships_social_context', 'friends')}
          />
          <TextField
            label="Work/School Environment"
            name="relationships_social_context_work_school_environment"
            fullWidth multiline
            margin="normal"
            value={formData.relationships_social_context.work_school_environment}
            onChange={(e) => handleNestedChange(e, 'relationships_social_context', 'work_school_environment')}
          />

          <Button type="submit" variant="contained" className="button" sx={{ mt: 2 }}>
            {persona ? 'Update' : 'Save'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
