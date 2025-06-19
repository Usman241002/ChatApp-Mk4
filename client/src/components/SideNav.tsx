import { Home, MailOutline, Search, Logout } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { red } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearUser } from "../features/userSlice";
import { clearSocket } from "../features/socketSlice";
import { socket } from "../app/socket";

export default function SideNav() {
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const id = useAppSelector((state) => state.user.id);

  const unreadCount = useAppSelector(
    (state) =>
      Object.values(state.messageHistory).filter((chat) => chat.unreadStatus)
        .length,
  );

  function handleLogout() {
    socket.emit("logout", id);
    setTimeout(() => {
      dispatch(clearUser());
      dispatch(clearSocket());
    }, 100);

    setTimeout(() => {
      socket.disconnect();
    }, 100);
  }

  const navButtonStyles = {
    backgroundColor: "#E6E6E6",
    color: "#5F5F5F",
    justifyContent: "start",
    pl: 2,
    "&.active": {
      background: "linear-gradient(180deg, #4A90E2 0%, #357ABD 100%)",
      color: "#FFFFFF",
    },
  };

  const navItems = [
    { name: "Home", icon: <Home /> },
    { name: "Inbox", icon: <MailOutline /> },
    { name: "Search", icon: <Search /> },
  ];

  return (
    <Paper elevation={3} sx={{ minWidth: "18.75rem", pt: 4, pb: 2 }} square>
      <Stack
        spacing={2}
        px={2}
        justifyContent="space-between"
        alignItems="stretch"
        sx={{ width: "100%", height: "100%" }}
      >
        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 2,
            }}
          >
            <Avatar
              variant="rounded"
              sx={{
                borderRadius: 5,
                width: "8rem",
                height: "8rem",
                background:
                  "linear-gradient(0deg, rgba(79, 195, 247, 0.30) 0%, rgba(79, 195, 247, 0.30) 100%), linear-gradient(135deg, #1976D2 0%, #EAE6FD 100%)",
              }}
            />
            <Typography variant="h4" gutterBottom>
              {username}
            </Typography>
          </Box>

          {navItems.map((item, index) => {
            const button = (
              <Button
                key={index}
                variant="contained"
                component={NavLink}
                to={item.name === "Home" ? "/" : item.name.toLowerCase()}
                startIcon={item.icon}
                sx={navButtonStyles}
                fullWidth
              >
                {item.name}
              </Button>
            );
            return item.name === "Inbox" ? (
              <Badge
                key={index}
                badgeContent={unreadCount || undefined}
                color="primary"
              >
                {button}
              </Badge>
            ) : (
              button
            );
          })}
        </Stack>
        <Button
          variant="contained"
          sx={{
            color: red[300],
            backgroundColor: red[50],
            justifyContent: "start",
            pl: 2,
          }}
          startIcon={<Logout sx={{ color: red[300] }} />}
          onClick={handleLogout}
          fullWidth
        >
          Logout
        </Button>
      </Stack>
    </Paper>
  );
}
