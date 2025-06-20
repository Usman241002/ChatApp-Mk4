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
          display: "flex",
          justifyContent: "space-between",
          width: "100vw",
          height: `calc(100vh - ${isMobile ? "56px" : "64px"})`,
          mt: { xs: 7, sm: 8 },
        }}
      >
        {isMobile ? <BottomNav /> : <SideNav />}

        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            alignItems: "center",
            pt: { xs: 2, sm: 2, md: 3 },
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Stack>
    </>
  );
}
