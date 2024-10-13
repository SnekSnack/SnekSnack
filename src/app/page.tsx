"use client"

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import React, { useState, useEffect } from 'react';
import Chat from "@/components/Modals/Chat";
import Image from 'next/image';

import '@/app/globals.css'
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";

export default function Home() {

  const [assignmentCompleted, setAssignmentCompleted] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<any | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // Open/Close modal
  const [texts, setTexts] = useState<any[]>([]);

  useEffect(() => {
    getAssignments();
    //check if there are assignments
    if (selectedAssignment == null) {
      setAssignmentCompleted(false);
    }
    else {
      // get the texts for relevant assignment
      getTexts(selectedAssignment.id);

      // check if question limit is reached
      if (texts.length >= selectedAssignment.question_limit) {
        setAssignmentCompleted(true);
      }

    }
  }, []);

  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = (event: any, reason: string) => {
    // Prevent closing when the backdrop is clicked
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setIsChatOpen(false);
      setSelectedAssignment(null);
    }
  };
  const handleChatSubmit = () => {
    // set student to have done assignment on db --  store chat messages
    setAssignmentCompleted(true);
  }
  const handleChat = (assignment: any) => {
    setSelectedAssignment(assignment);
    handleChatOpen();
  };


  const getAssignments = () => {

    api.get("/api/students/")
      .then((res) => res.data)
      .then((data) => {
        setSelectedAssignment(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

  };

  const getTexts = (id: number) => {
    api.get(`students/text/${id}/`)
      .then((res) => res.data)
      .then((data) => {
        setTexts(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <ProtectedRoute>
      <Header userName="username" />

      <Box className="content-wrapper">
        <Button className="button" disabled={assignmentCompleted} onClick={handleChat} variant="contained" color="primary">Start chat</Button>
        <Button className="button" disabled={!assignmentCompleted} variant="contained" color="primary">Download chat transcript</Button>
      </Box>

      {isChatOpen && (
        <Chat
          open={isChatOpen}
          onClose={handleChatClose}
          onSubmit={handleChatSubmit}
          assignment={selectedAssignment}
          persona={selectedPersona}
        />
      )}

    </ProtectedRoute>
  );
}
