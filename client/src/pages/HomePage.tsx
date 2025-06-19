import { Container, Box, Stack } from "@mui/material";
import Hero from "../components/Hero";
import SignInForm from "../components/SignInForm";

export default function HomePage() {
  return (
    <Box
      width="100%"
      height="100vh"
      sx={{
        background: "linear-gradient(145deg, #125A8E 0%, #1976D2 59.05%)",
      }}
    >
      <Container>
        <Stack
          spacing={{ xs: 2, sm: 2, md: 8 }}
          px={{ xs: 0, sm: 0, md: 4 }}
          direction={{ xs: "column", sm: "column", md: "row" }}
          height="100vh"
        >
          <Hero />
          <SignInForm />
        </Stack>
      </Container>
    </Box>
  );
}
