"use client"

import { Box, Button } from "@mui/material";
import Header from "@/components/Header";

import '@/app/globals.css'

export default function Home() {

  /* temporary data and datatype
    interface Message {
      timestamp: Date;
      isFromUser: Boolean;
      text: String;
    }
    interface Chat {
      chatId: String;
      assignmentId: String;
      studentId: String;
      submittedOn: Date;
      messages: Message[];
    }
  */
  const chats = [
    {id: "c001", assignmentId: "a001", studentId: "s001"},
    {id: "c002", assignmentId: "a001", studentId: "s002"},
    {id: "c003", assignmentId: "a002", studentId: "s001"},
  ];

  return (
    <>
      <Header userName="username"/>

      <Box className="content-wrapper">
        <Button className="button" href="/Chat">Start chat</Button>
      </Box>
    </>
  );
}
