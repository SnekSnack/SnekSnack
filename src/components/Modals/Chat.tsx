"use client"

import React, { useState, useEffect, useRef } from 'react';
import api from "@/api.js";
import { Box, Button, TextField, Typography, IconButton, Modal } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import "@/app/globals.css"
import jsPDF from "jspdf";
import "jspdf-autotable";

function getMessageResponse(message:String) {

  // !! === implement llm response ===================================================

  const response = message.split("").reverse().join(""); // instead of this
  return response;
}

interface ChatProps {
  open: boolean;
  onClose: (event: any, reason: string) => void;
  onSubmit: (assignment: any) => void;
  chatId? : any;
  assignment?: any; // For editing an assignment
  personaId?: any;
  student?: any;
  test?: boolean | false;
}

export default function Chat({ open, onClose, onSubmit, chatId, assignment, personaId, student, test }: ChatProps) {
  const [chatData, setChatData] = useState({
    id: chatId,
    assignment: assignment,
    student: student,
    chatName: '',
    question_limit: 10,
  });
  const [personaData, setPersonaData] = useState({
    id: personaId,
    name: '',
  });
  const [messages, setMessages] = useState<[string, boolean][]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState(chatData.question_limit);
  const [inputValue, setInputValue] = useState<string>("");
  const [disableSend, setDisableSend] = useState(false);
  const [openDownloadTranscript, setOpenDownloadTranscript] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (test) {
      setChatData({
        id: null,
        assignment: null,
        student: null,
        chatName: 'Test Chat',
        question_limit: 100,
      });
    }
    else if (assignment) {

      // !! === get assignment data =========================================================

      setChatData({
        id: chatId,
        assignment: assignment,
        student: student,
        chatName: '', // change
        question_limit: 10, // change
      });
    }
  
    if (personaId) {

      // !! === get persona data =========================================================

      setPersonaData({
        id: personaId,
        name: 'Interviewee'
      });
    }
  }, [assignment, personaId]);

  const handleSendMessage = () => {
    if (inputValue.trim() !== "" && remainingQuestions > 0) {
      setDisableSend(true); // stop user from sending anything

      var response = getMessageResponse(inputValue);
      
      setMessages([...messages, [inputValue, true], [response, false]]);

      // !! === save message and response in DB ===================================================

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
    <Modal className="modal-wrapper" open={open} onClose={onClose}>
      <Box className="modal-chat">
        <Typography sx={{padding: '30px'}} variant="h6">{personaData.name + ":"}</Typography>
        <Box
            sx={{
              flexGrow: 1,
              overflowY: "auto", // Scroll if chat bubbles exceed the height
              mb: 2,
              width: '100%', 
              height: '64vh',
              padding: '30px',
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
                  bgcolor: (message[1]) ? "#555555" : "#dddddd",
                  color: (message[1]) ? "#ffffff" : "#000000",
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
        <Box className="column" sx={{ 
          position: 'absolute', // Child is absolutely positioned
          bottom: 0, // Stick to the bottom
          width: 'full', // Take full width of the parent
          display: "flex", 
          alignSelf: "center", 
          justifyContent: "center", 
          marginBottom: "30px",
          }}>
          <Box sx={{ 
          width: 'full',
          display: "flex", 
          alignSelf: "center", 
          justifyContent: "center", 
          gap: 2
          }}>
          <IconButton color="primary">
            <MicIcon />
          </IconButton>
          
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
            sx={{ 
              flexGrow: 1, 
              width: {          
                xs: 'full', 
                sm: '360px',
                md: '620px',
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
            sx={{ bgcolor: "#3c70ba", color: "white", gap: 1 }}
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
        </Box>

        


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