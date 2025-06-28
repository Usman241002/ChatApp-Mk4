import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { useAppSelector } from "../app/hooks";
import UserCard from "../components/UserCard";

export default function InboxPage() {
  const messageHistory = useAppSelector((state) => state.messageHistory);

  const inbox = useMemo(() => {
    return Object.values(messageHistory).filter(
      (conversation) => conversation.unreadStatus === true,
    );
  }, [messageHistory]);

  return (
    <Stack
      spacing={{ xs: 2, sm: 2, md: 4 }}
      sx={{ width: "100%", overflowY: "auto", p: 2 }}
    >
      <Typography
        align="center"
        sx={{ typography: { xs: "h5", sm: "h5", md: "h4" } }}
      >
        New Messages
      </Typography>

      {inbox.length === 0 && (
        <Typography variant="h6" align="center">
          No new messages
        </Typography>
      )}
      <Stack spacing={1}>
        {inbox.map((conversation) => (
          <UserCard
            key={conversation.user.id}
            id={conversation.user.id}
            username={conversation.user.username}
            age={conversation.user.age}
            gender={conversation.user.gender}
            country={conversation.user.country}
          />
        ))}
      </Stack>
    </Stack>
  );
}
