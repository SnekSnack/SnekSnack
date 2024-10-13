"use client"

import React, { useState, useEffect } from 'react';
import api from "@/api.js";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import PastChat from '@/components/Modals/PastChat'
import Header from '@/components/Header';
import "../../globals.css"
import ProtectedRoute from "@/components/ProtectedRoute"
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const router = useRouter();
  const [students, setStudents] = useState<any[]>([]); // Open/Close modal
  const [messages, setMessages] = useState<any[]>([]); // Open/Close modal
  const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false); // Open/Close modal

  useEffect(() => {
    api.get("/api/header/")
      .then((res) => res.data)
      .then((data) => {
        if (data.groups.length>0) {
          console.log("Page load success")
        } else {
          console.log("Access Forbidden")
          router.push("/");
        }
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });

    //start here
    getStudents();
  }, []);

  const getStudents = () => {
    api.get(`/api/student/list/`)
      .then((res) => res.data)
      .then((data) => {
        setStudents(data);
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const doNothing = () => { }
  const handleChat = (student: any) => {
    setSelectedStudent(student);
    handleChatOpen();
  };
  const handleChatOpen = () => setIsChatOpen(true);
  const handleChatClose = (event: any, reason: string) => {
    setIsChatOpen(false);
  };

  return (
    <ProtectedRoute>
      <Header userName="username" />
      <Box className="content-wrapper">
        <Box className="row gap-4">
        <Button className="button bg-white text-black" variant="contained" href="/Admin"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: '#414141', 
              },
            }}
          >
            Assignments
          </Button>
          <Button className="button bg-white text-black" variant="contained" href="/Admin/Personas"
            sx={{
              backgroundColor: 'white',
              color: 'black',
              '&:hover': {
                backgroundColor: '#414141', 
              },
            }}
          >
            AI Personas
          </Button>
          <Button className="button" variant="contained" disabled={true}>
            Students
          </Button>
        </Box>

        {/* Table for Personas */}
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                {/*<TableCell>Prompt</TableCell>*/}
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  {/*<TableCell>{student.prompt}</TableCell>*/}
                  <TableCell>
                    <IconButton onClick={() => handleChat(student)}>
                      <ChatIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {isChatOpen && (
          <PastChat
            open={isChatOpen}
            onClose={handleChatClose}
            student={selectedStudent}
            assignment={null} // get most recent assignment?
          />
        )}
      </Box>
    </ProtectedRoute>
  );
}
