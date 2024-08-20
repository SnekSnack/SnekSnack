"use client"

import { Box } from "@mui/material";
import Header from "@/components/Header";

import '@/app/globals.css'
import AssignmentBar from "@/components/AssignmentBar";

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
        <Box className="column gap-4">
        {chats.map((chat) => (
          <AssignmentBar assignment={chat}/>
        ))}
        </Box>
      </Box>
    </>
  );
}
