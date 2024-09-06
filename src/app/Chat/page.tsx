"use client";

import React, { useState, useRef } from "react";
import { Box, Button, TextField, Typography, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
//import Header from "@/components/Header";
import "@/app/globals.css"

function getMessageResponse(message:String) {
  const reversedMessage = message.split("").reverse().join("");
  return reversedMessage;
}

export default function ChatPage() {

    /* Components */
    const [messages, setMessages] = useState<[string, boolean][]>([]);
    const [remainingQuestions, setRemainingQuestions] = useState(10);
    const [inputValue, setInputValue] = useState<string>("");
    const [disableSend, setDisableSend] = useState(false);

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

        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });

      };

    return (
      <>
        {/* <Header userName="John Doe" /> */}
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: 700,
            width: "98%",
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
              width: {          
                xs: '100%', 
                sm: '570px',
                md: '820px',
              }
            }}
          >

            {/* Chat Bubbles */}
            {messages.map((message, index) => (
              <Box sx={{
                  width: "100%",
                  display: 'flex',
                  justifyContent: (message[1]) ? 'flex-end' : 'flex-start',
                }}
              >
                <Box
                  key={index}
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
                  sm: '450px',
                  md: '700px',
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
        </Box>
      </>
    );
  }