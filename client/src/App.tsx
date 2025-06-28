import { ThemeProvider } from "@emotion/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import type { Message, User } from "../../shared/types";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { socket } from "./app/socket";
import Layout from "./components/Layout";
import { addMessage } from "./features/messageHistorySlice";
import ChatPage from "./pages/ChatPage";
import HomePage from "./pages/HomePage";
import InboxPage from "./pages/InboxPage";
import SearchPage from "./pages/SearchPage";
import UsersPage from "./pages/UsersPage";
import theme from "./theme";

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const isLoggedIn: boolean = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleUsersList = (data: User[]) => setUsers(data);

    socket.on("usersList", handleUsersList);
    if (socket.connected) {
      socket.emit("getUsersList");
    }

    const handleMessage = ({
      id,
      userDetails,
      message,
      unreadStatus,
    }: {
      id: string;
      userDetails: Omit<User, "isLoggedIn">;
      message: Message;
      unreadStatus: boolean;
    }) => {
      dispatch(
        addMessage({
          id,
          userDetails,
          message,
          unreadStatus,
        }),
      );
    };

    socket.on("message", handleMessage);

    return () => {
      socket.off("usersList", handleUsersList);
      socket.off("message", handleMessage);
    };
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          {!isLoggedIn && <Route path="/" element={<HomePage />} />}

          {!isLoggedIn && (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}

          {isLoggedIn && (
            <Route element={<Layout />}>
              <Route path="/" element={<UsersPage users={users} />} />
              <Route path="/:username" element={<ChatPage />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/search" element={<SearchPage users={users} />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
