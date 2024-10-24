"use client"

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";
import React, { useState, useEffect } from 'react';
import Chat from "@/components/Modals/Chat";
import '@/app/globals.css'
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Home() {
  const [student, setStudent] = useState<any | null>(null);
  const [assignmentCompleted, setAssignmentCompleted] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // Open/Close modal
  const [texts, setTexts] = useState<any[]>([]);

  const sendMessage = (newAssignment: any) => {
    api.post(`/api/student/list/`, newAssignment)
      .then((res) => {
        getStudent();
      })
      .catch((err) => alert(err));
  }


  useEffect(() => {
    getStudent();
    getAssignments();
    //check if there are assignments
    if (selectedAssignment == null) {
      setAssignmentCompleted(false);
    }
    else {
      // get the texts for relevant assignment
      getTexts(selectedAssignment.id);

      // check if question limit is reached
      if (texts.length >= 0) {
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

    // !! === set student to have done assignment on db ===================================================

    setAssignmentCompleted(true);
  }
  const handleChat = (assignment: any) => {
    setSelectedAssignment(assignment);
    handleChatOpen();
  };

  const getStudent = () => {

    api.get("/api/header/")
      .then((res) => res.data)
      .then((data) => {
        setStudent(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
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


  const [messages, setMessages] = useState<[string, boolean][]>([]);
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
  const handleDownloadTranscript = () => {

    getMessages(selectedAssignment.id, student.id)

    //create pdf of the transcript
    const doc = new jsPDF();
    const headers = ["Question", "Answer", "Explanation"];
    const data: string[][] = []
    let question = "";
    messages.forEach(([message, isUser]) => {
      if (isUser) {
        question = message;
      } else {
        const answer = message;
        data.push([question, answer, ""]);
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
    <ProtectedRoute>
      <Header isProtectedPage={false} />

      <Box className="content-wrapper">
        <Button className="button" disabled={assignmentCompleted} onClick={handleChat} variant="contained" color="primary">Start chat</Button>
        <Button className="button" disabled={!assignmentCompleted} onClick={handleDownloadTranscript} variant="contained" color="primary">Download chat transcript</Button>
      </Box>

      {isChatOpen && (
        <Chat
          open={isChatOpen}
          onClose={handleChatClose}
          onSubmit={handleChatSubmit}
          assignment={selectedAssignment}
        />
      )}

    </ProtectedRoute>
  );
}
