"use client"

import React, { useState, useEffect, useRef } from 'react';
import api from "@/api.js";
import { Box, Button, TextField, Typography, IconButton, Modal } from "@mui/material";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import "@/app/globals.css"
import jsPDF from "jspdf";
import "jspdf-autotable";

interface ChatProps {
  open: boolean;
  onClose: (event: any, reason: string) => void;
  chatId? : any;
  student? : any;
  assignment?: any;
}

export default function Chat({ open, onClose, chatId, student, assignment }: ChatProps) {

  /* Components */
  const [messages, setMessages] = useState<[string, boolean][]>([]);

  useEffect(() => {
    getMessages(0, student.id);
  }, [assignment]);

  //get messages of users
  const getMessages = (ass_id: number, student_id: number) => {
    api.get(`/api/messages/${ass_id}/${student_id}/`)
      .then((res) => res.data)
      .then((data) => {
        setMessages(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-chat">
        <Box className="flex">
          <Typography variant="h6">{"Chat Transcript:" + ""}</Typography>
          <IconButton onClick={() => handleDownloadTranscript()}>
            <FileOpenIcon />
          </IconButton>
        </Box>
        
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
        </Box>

      </Box>
    </Modal>
  );
}