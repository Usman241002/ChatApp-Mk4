import { Avatar, Card, CardHeader } from "@mui/material";
import { Link } from "react-router-dom";
import type { User } from "../../../shared/types";

type Props = Omit<User, "isLoggedIn">;

export default function UserCard({
  id,
  username,
  age,
  gender,
  country,
}: Props) {
  return (
    <Card
      component={Link}
      to={`/${username}`}
      sx={{
        display: "block",
        width: "100%",
        borderRadius: 4,
        textDecoration: "none",
        boxShadow: 2,
        backgroundColor: "#FFFFFF",
        transition: "box-shadow 0.3s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: 6,
          transform: "translateY(-1px)",
        },
      }}
      state={{ id, username, age, gender, country }}
    >
      <CardHeader
        avatar={
          <Avatar
            variant="rounded"
            sx={{
              borderRadius: 2,
              background:
                "linear-gradient(0deg, rgba(79, 195, 247, 0.30) 0%, rgba(79, 195, 247, 0.30) 100%), linear-gradient(135deg, #1976D2 0%, #EAE6FD 100%)",
            }}
          />
        }
        title={username}
        subheader={`${age} years, ${gender}, ${country}`}
        slotProps={{
          title: {
            sx: {
              typography: { xs: "body1", sm: "body1", md: "h6" },
              fontWeight: "bold !important",
            },
          },
        }}
      ></CardHeader>
    </Card>
  );
}
