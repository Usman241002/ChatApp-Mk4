import { Home, Logout, MailOutline, Search } from "@mui/icons-material";
import { Toolbar, Stack, IconButton, Badge } from "@mui/material";
import { red } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearUser } from "../features/userSlice";

export default function BottomNav() {
  const dispatch = useAppDispatch();

  const unreadCount = useAppSelector(
    (state) =>
      Object.values(state.messageHistory).filter((chat) => chat.unreadStatus)
        .length,
  );

  const navButtonStyles = {
    borderRadius: "0.625rem",
    backgroundColor: "#E6E6E6",
    color: "#5F5F5F",
    "&.active": {
      background: "linear-gradient(180deg, #4A90E2 0%, #357ABD 100%)",
      color: "#FFFFFF",
      border: "1px solid #FFF",
    },
  };

  const navItems = [
    { name: "Home", icon: <Home /> },
    {
      name: "Inbox",
      icon: <MailOutline />,
    },
    { name: "Search", icon: <Search /> },
  ];
  return (
    <Toolbar sx={{ px: 0, py: 2, backgroundColor: "#ffffff" }}>
      <Stack
        direction="row"
        spacing={2}
        px={2}
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Stack spacing={2} direction="row">
          {navItems.map((item, index) => {
            const button = (
              <IconButton
                key={index}
                component={NavLink}
                to={item.name === "Home" ? "/" : item.name.toLowerCase()}
                sx={navButtonStyles}
              >
                {item.icon}
              </IconButton>
            );

            return item.name === "Inbox" ? (
              <Badge key={index} badgeContent={unreadCount} color="primary">
                {button}
              </Badge>
            ) : (
              button
            );
          })}
        </Stack>
        <IconButton
          component={NavLink}
          to="/"
          sx={{
            color: red[300],
            backgroundColor: red[50],
            borderRadius: "0.625rem",
          }}
          onClick={() => {
            dispatch(clearUser());
          }}
        >
          <Logout />
        </IconButton>
      </Stack>
    </Toolbar>
  );
}
