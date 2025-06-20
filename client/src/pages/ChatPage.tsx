import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { socket } from "../app/socket";
import UserCard from "../components/UserCard";
import { addMessage, readMessage } from "../features/messageHistorySlice";
import { Send } from "@mui/icons-material";

export default function ChatPage() {
  const [message, setMessage] = useState<string>("");

  const location = useLocation();
  const { id, username, age, gender, country } = location.state;

  const dispatch = useAppDispatch();
  const sender = useAppSelector((state) => state.user);

  const messageHistory = useAppSelector((state) => state.messageHistory);

  const messages = useMemo(() => {
    return messageHistory[id]?.messages || [];
  }, [messageHistory, id]);

  useEffect(() => {
    dispatch(readMessage({ id }));
  }, [dispatch, id]);

  function handleClick() {
    socket.emit("message", {
      id, //who the message is being sent to
      userDetails: {
        id: sender.id,
        username: sender.username,
        age: sender.age,
        gender: sender.gender,
        country: sender.country,
      }, //user details of who its from
      message: {
        to: id, //who the message is being sent to
        from: sender.id, //who the message is from
        message, //the actual message
      },
      unreadStatus: true, //mark it as unread so it appears in the inbox of the other user
    });
    dispatch(
      addMessage({
        id, //who the message is being sent to
        userDetails: {
          id: id,
          username: username,
          age: age,
          gender: gender,
          country: country,
        }, //user details of who its from
        message: {
          to: id, //who the message is being sent to
          from: sender.id, //who the message is from
          message, //the actual message
        },
        unreadStatus: false, //message sent by user is marked as read, as he is the one who sent it
      }),
    );
    setMessage("");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        flexGrow: 1,
        width: "100%",
        maxWidth: "100%",
        maxHeight: "100%",
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <UserCard
          key={id}
          id={id}
          username={username}
          age={age}
          gender={gender}
          country={country}
        />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 0.5,
          px: 1, // Add some padding for better mobile experience
          minHeight: 0, // Important for flex child to shrink
        }}
      >
        {messages &&
          messages.map((message, index) => (
            <Typography
              key={index}
              variant="body1"
              align="left"
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: 3,
                py: 0.5,
                px: 1,
                whiteSpace: "normal",
                overflowWrap: "break-word",
              }}
            >
              <b>{message.from === sender.id ? "You" : username}</b>:{" "}
              {message.message}
            </Typography>
          ))}
      </Box>

      <Stack direction="row" sx={{ flexShrink: 0, gap: 1 }}>
        <TextField
          label="Message"
          variant="outlined"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          fullWidth
          autoComplete="off"
          required
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (message.trim()) {
                handleClick();
              }
            }
          }}
          slotProps={{
            htmlInput: { maxLength: 100 },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleClick}
          disabled={!message.trim()}
          endIcon={<Send />}
          sx={{ minWidth: "auto", px: 2 }}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}
