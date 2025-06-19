import { ArrowForward } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { FormEvent } from "react";
import { useState, useEffect } from "react";
import type { UserFormData } from "../../../shared/types";
import { useAppDispatch } from "../app/hooks";
import countries from "../assets/countries.json";
import { setUser } from "../features/userSlice";
import { socket } from "../app/socket";
import { setSocket } from "../features/socketSlice";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    age: 18,
    gender: "",
    country: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    socket.connect();

    socket.on("connect", () => {
      dispatch(setUser({ ...formData, id: socket.id, isLoggedIn: true }));
      dispatch(setSocket({ socketId: socket.id, isConnected: true }));
      socket.emit("login", { ...formData, id: socket.id, isLoggedIn: true });
    });

    socket.on("connect_error", (error) => {
      console.error("Socket connection failed:", error);
    });
  }

  useEffect(() => {
    return () => {
      socket.off("connect");
    };
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: { xs: "100%", sm: "100%", md: "50rem" },
      }}
    >
      <Paper
        sx={{
          width: "100%",
          p: 3,
          borderRadius: {
            xs: "1.5rem 1.5rem 0rem 0rem",
            sm: "1.5rem 1.5rem 0rem 0rem",
            md: 0,
          },
        }}
      >
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={{ xs: 2, sm: 2, md: 4 }}
          sx={{
            width: "100%",
            boxShadow: { xs: 5, sm: 5, md: 0 },
            p: { xs: 3, sm: 3, md: 0 },
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{ fontWeight: "bold" }}
            gutterBottom
          >
            Enter Details
          </Typography>
          <TextField
            variant="outlined"
            label="Username"
            id="username"
            name="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            slotProps={{
              htmlInput: { maxLength: 15 },
            }}
            helperText={
              formData.username.length === 0
                ? ""
                : `${15 - formData.username.length} characters remaining`
            }
            required
          />
          <FormControl required>
            <InputLabel id="age">Age</InputLabel>
            <Select
              labelId="age"
              label="Age"
              id="age"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: Number(e.target.value) })
              }
            >
              {[...Array(63)].map((_, i) => {
                const value = i + 18;
                return (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl required>
            <FormLabel id="gender">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="gender"
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
            >
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          </FormControl>
          <FormControl>
            <Autocomplete
              options={countries.map((country) => country.name)}
              value={formData.country}
              onChange={(_, value) =>
                setFormData({ ...formData, country: value || "" })
              }
              renderInput={(params) => (
                <TextField {...params} label="Country" required />
              )}
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<ArrowForward />}
            sx={{
              transition: " transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          >
            Start Chat Now
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
