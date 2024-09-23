"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography, IconButton, Modal } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import "@/app/globals.css"
import jsPDF from "jspdf";

function getMessageResponse(message:String) {
  const reversedMessage = message.split("").reverse().join("");
  return reversedMessage;
}

interface ChatProps {
  open: boolean;
  onClose: (event: any, reason: string) => void;
  onSubmit: (assignment: any) => void;
  assignment?: any; // For editing an assignment
  persona?: any;
}

export default function Chat({ open, onClose, onSubmit, assignment, persona }: ChatProps) {
  const [chatData, setChatData] = useState({
    name: '',
    question_limit: 10,
  });
  const [personaData, setPersonaData] = useState({
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

  useEffect(() => {
    if (assignment) {
      setChatData({
        name: assignment.name,
        question_limit: assignment.question_limit,
      });
    } else {
      setChatData({
        name: 'Test Chat',
        question_limit: 100,
      });
    }
  
    if (persona) {
      setPersonaData({
        name: persona.name || '',
        age: persona.age || '',
        gender: persona.gender || '',
        occupation: persona.occupation || '',
        tone: persona.tone || '',
        condition: {
          name: persona.condition?.name || '',
          description: persona.condition?.description || '',
          duration: persona.condition?.duration || ''
        },
        personality_traits: {
          overall: persona.personality_traits?.overall || '',
          introverted_extroverted: persona.personality_traits?.introverted_extroverted || '',
          optimistic_pessimistic: persona.personality_traits?.optimistic_pessimistic || '',
          decision_making_style: persona.personality_traits?.decision_making_style || '',
          communication_style: persona.personality_traits?.communication_style || ''
        },
        background_history: {
          early_life: persona.background_history?.early_life || '',
          key_life_events: persona.background_history?.key_life_events || '',
          current_life_situation: persona.background_history?.current_life_situation || ''
        },
        relationships_social_context: {
          family: persona.relationships_social_context?.family || '',
          friends: persona.relationships_social_context?.friends || '',
          work_school_environment: persona.relationships_social_context?.work_school_environment || ''
        }
      });
    } else if (assignment) {
      // If no persona but assignment exists, set personaData.name to assignment.name
      setPersonaData((prevState) => ({
        ...prevState,
        name: assignment.name || '', // Set name from assignment
      }));
    }
  }, [assignment, persona]);


  /* Components */
  const [messages, setMessages] = useState<[string, boolean][]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState(chatData.question_limit);
  const [inputValue, setInputValue] = useState<string>("");
  const [disableSend, setDisableSend] = useState(false);
  const [openDownloadTranscript, setOpenDownloadTranscript] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && remainingQuestions > 0) {
      setDisableSend(true); // stop user from sending anything

      var response = getMessageResponse(inputValue);
      
      setMessages([...messages, [inputValue, true], [response, false]]);

      setInputValue(""); 
      setRemainingQuestions(remainingQuestions - 1); 
      setDisableSend(false); // allow user to send again
    }
    if (remainingQuestions - 1 === 0){
      setOpenDownloadTranscript(true);
    }
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  //Function to download transcript as PDF
  const handleDownloadTranscript = () => {
    //generate transcript text
    const transcript = messages.map(([message]) => message).join('\n\n');
    //create pdf of the transcript
    const doc = new jsPDF();
    doc.text(transcript, 10, 10);
    doc.save('transcript.pdf');
    //close modal
    onSubmit(assignment);
    onClose(null, 'downloadTranscript');
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-chat">
        <Typography variant="h6">{personaData.name + ":"}</Typography>
        <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Scroll if chat bubbles exceed the height
              mb: 2,
              width: '100%', 
              height: '64vh'
            }}
        >

          {/* Chat Bubbles */}
          {messages.map((message, index) => (
            <Box key={index} sx={{
                width: "100%",
                display: 'flex',
                justifyContent: (message[1]) ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  bgcolor: (message[1]) ? "#d1c4e9" : "#dddddd",
                  p: 2,
                  mb: 1,
                  borderRadius: 1,
                  maxWidth: {          
                    xs: '100%', 
                    sm: '400px',
                    md: '600px',
                  },
                  alignSelf: (message[1]) ? "flex-end" : "flex-start", // Align chat bubbles to the left
                }}
              >
                <Typography variant="body1">{message[0]}</Typography>
              </Box>
            </Box>
          ))}
          <div ref={chatEndRef} />
        </Box>
          

        {/* TEXTBOX */}
        <Box sx={{ display: "flex", alignSelf: "center", justifyContent: "center", gap: 2 }}>
          
          <IconButton color="primary">
            <MicIcon />
          </IconButton>
          
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
            sx={{ flexGrow: 1, 
              width: {          
                xs: 'full', 
                sm: '420px',
                md: '690px',
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter'){
                handleSendMessage();
              }
            }}
          />

          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{ bgcolor: "primary.main", color: "white", gap: 1 }}
            disabled={(disableSend) || (remainingQuestions === 0)} // Disable the button if no questions remain
          >
            Send
            <SendIcon/>
            </Button>
        </Box>

        {/* Question Counter */}
        <Typography
          id="number-of-questions"
          variant="body1"
          sx={{
            marginTop: 2,
            color: "gray"
          }}
        >
          Number of questions remaining: {remainingQuestions}
        </Typography>


        {openDownloadTranscript &&(
          <Modal
            open={openDownloadTranscript}
          >

            <Box
              sx = {{
                
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                width: 400,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >

              <Typography variant="h6" sx={{ mb: 2, textAlign: 'center'}}>
                No More Questions Remaining.
                Please Download the Transcript and Submit to LMS.
              </Typography>

              {/* Download Transcript Button */}
              <Button
                className="button"
                variant = "contained"
                color = "primary"
                onClick={handleDownloadTranscript}
                sx={{ 
                  display: "block",
                  margin: "0 auto", 
                  marginTop: 2 }}
              >
              Download Transcript as PDF
              </Button>
            </Box>
          
          </Modal>
        )}
      </Box>
    </Modal>
  );
}
