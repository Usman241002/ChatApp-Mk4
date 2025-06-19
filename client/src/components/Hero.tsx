import { Box, Typography } from "@mui/material";

export default function Hero() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "30%", sm: "30%", md: "100vh" },
        width: "100%",
        p: 6,
      }}
    >
      <Typography
        align="center"
        variant="h2"
        sx={{
          color: "#FFFFFF",
          fontWeight: "bold !important",
        }}
      >
        ChatApp
      </Typography>
      <Typography variant="h5" align="center" sx={{ color: "#FFFFFF" }}>
        Connect • Chat • Discover
      </Typography>
    </Box>
  );
}
