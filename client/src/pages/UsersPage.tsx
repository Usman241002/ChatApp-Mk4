import { Box, Stack, Typography } from "@mui/material";
import UserCard from "../components/UserCard";
import type { User } from "../../../shared/types";

export default function UsersPage({ users }: { users: User[] }) {
  return (
    <Stack
      spacing={{ xs: 2, sm: 2, md: 4 }}
      sx={{ width: "100%", overflowY: "auto", p: 2 }}
    >
      <Box>
        <Typography
          align="center"
          sx={{
            typography: { xs: "h5", sm: "h5", md: "h4" },
            fontWeight: "bold !important",
            background:
              "linear-gradient(272deg, #125A8E 0%, #1976D2 100%) !important",
            WebkitBackgroundClip: "text !important",
            WebkitTextFillColor: "transparent !important",
          }}
        >
          Find Your Perfect Match
        </Typography>
        <Typography variant="body1" align="center">
          {users.length} people online now
        </Typography>
      </Box>
      <Stack spacing={1}>
        {users.map((user) => (
          <UserCard
            key={user.id}
            id={user.id}
            username={user.username}
            age={user.age}
            gender={user.gender}
            country={user.country}
          />
        ))}
      </Stack>
    </Stack>
  );
}
