import { ArrowBack } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
  backButton: boolean;
};

export default function TopNav({ title, backButton = true }: Props) {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar
        sx={{
          background: "linear-gradient(272deg, #125A8E 0%, #1976D2 100%)",
        }}
      >
        {backButton && (
          <IconButton
            size="small"
            aria-label="back"
            onClick={() => navigate(-1)}
            sx={{
              display: { xs: "flex", sm: "flex", md: "none" },
              borderRadius: "0.625rem",
              border: "1px solid #FFF",
              background: "linear-gradient(135deg, #1976D2 0%, #848A90 100%)",
            }}
          >
            <ArrowBack sx={{ color: "#FFFFFF" }} />
          </IconButton>
        )}

        <Typography variant="h4" align="center" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
