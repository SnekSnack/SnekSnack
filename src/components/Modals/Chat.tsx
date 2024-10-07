"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography, IconButton, Modal } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import "@/app/globals.css"
import jsPDF from "jspdf";
import "jspdf-autotable";

function getMessageResponse(message:String) {
  const reversedMessage = message.split("").reverse().join("");
  return reversedMessage;
}

interface ChatProps {
  open: boolean;
  onClose: (event: any, reason: string) => void;
  onSubmit: (assignment: any) => void;
  chatId? : any;
  assignment?: any; // For editing an assignment
  persona?: any;
}

export default function Chat({ open, onClose, onSubmit, chatId, assignment, persona }: ChatProps) {
  const [chatData, setChatData] = useState({
    id: null,
    assignmentId: null,
    name: '',
    question_limit: 10,
  });
  const [personaData, setPersonaData] = useState({
    id: null,
    name: '',
    prompt: '',
  });

  useEffect(() => {
    if (assignment) {
      setChatData({
        id: chatId,
        assignmentId: assignment.id,
        name: assignment.name,
        question_limit: assignment.question_limit,
      });
    } else {
      setChatData({
        id: null,
        assignmentId: null,
        name: 'Test Chat',
        question_limit: 100,
      });
    }
  
    if (persona) {
      setPersonaData({
        id: persona.id || null,
        name: persona.name || '',
        prompt: persona.prompt || '',
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
    
    //create pdf of the transcript
    const doc = new jsPDF();

    const headers = ["Question", "Answer", "Explanation"];

    const data: string[][] = []
    let question = "";

    messages.forEach(([message, isUser]) => {
      if(isUser){
        question = message;
      } else {
        const answer = message;
        data.push([question, answer,""]);
      }
    });

    doc.autoTable({
        head: [headers],
        body: data,
        startY: 20,
        styles: {
          fontSize: 10,
          cellPadding: 3,
        }
    })

    doc.text("Transcript of the Conversation", 15, 15);
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