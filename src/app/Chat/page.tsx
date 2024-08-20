"use client";

import React, { useState } from "react";
import { Box, Button, Modal,TextField, Typography } from "@mui/material";
import Header from "@/components/Header";
import "@/app/globals.css"

export default function ChatPage() {

    /* Components */
    const [messages, setMessages] = useState<string[]>([]);
    const [remainingQuestions, setRemainingQuestions] = useState(10);
    const [inputValue, setInputValue] = useState<string>("");

    const handleSendMessage = () => {
        if (inputValue.trim() !== "" && remainingQuestions > 0) {
          setMessages([...messages, inputValue]); 
          setInputValue(""); 
          setRemainingQuestions(remainingQuestions - 1); 
        }
      };

    return (
      <>
        <Header userName="John Doe" />
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            height: 700,
            width: "100%",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            mx: "auto", 
          }}
        >
            <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto", // Scroll if chat bubbles exceed the height
            mb: 2,
          }}
        >

        {/* Chat Bubbles */}
          {messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                bgcolor: "#d1c4e9",
                p: 2,
                mb: 1,
                borderRadius: 1,
                alignSelf: "flex-end", // Align chat bubbles to the left
              }}
            >
              <Typography variant="body1">{message}</Typography>
            </Box>
          ))}
        </Box>


        {/* TEXTBOX */}
        {remainingQuestions > 0 ? (
        <Box sx={{ display: "flex",alignSelf: "center", justifyContent: "center", gap: 2 }}>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            variant="outlined"
            sx={{ flexGrow: 1, maxWidth: 600 }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage(); // Call the send message function when Enter is pressed
                }
            }}
          />
          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{ bgcolor: "primary.main", color: "white" }}
            disabled={remainingQuestions === 0} // Disable the button if no questions remain
          >
            Send
          </Button>
        </Box>
        ): null }


        {/* Question Counter */}
        <Typography
          id="number-of-questions"
          variant="body1"
          sx={{
            position: "fixed",
            bottom: 90,
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
            {remainingQuestions === 0
          ? "You have reached the limit of your questions"
          : `Number of questions remaining: ${remainingQuestions}`}
        </Typography>
        </Box>
      </>
    );
  }