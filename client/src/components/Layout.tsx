import { Outlet } from "react-router-dom";
import TopNav from "./TopNav";
import SideNav from "./SideNav";
import BottomNav from "./BottomNav";
import { Box, Stack, useMediaQuery } from "@mui/material";
import theme from "../theme";

export default function Layout() {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <TopNav title="Discover People" backButton={false} />
      <Stack
        direction={{ xs: "column-reverse", sm: "column-reverse", md: "row" }}
        sx={{
          mt: { xs: 7, sm: 8 },
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        {isMobile ? <BottomNav /> : <SideNav />}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100%",
            p: { xs: 0, sm: 0, md: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}
