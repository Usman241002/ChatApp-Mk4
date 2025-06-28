import { Search } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import countries from "../assets/countries.json";
import { setSearch } from "../features/searchSlice";
import type { User } from "../../../shared/types";
import UserCard from "../components/UserCard";

export default function SearchPage({ users }: { users: User[] }) {
  const ageRanges: string[] = [
    "18-26",
    "26-34",
    "34-42",
    "42-50",
    "50-58",
    "58-66",
    "66-74",
  ];

  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.search);

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const [minAge, maxAge] = search.ageRange
      ? search.ageRange.split("-").map(Number)
      : [0, Infinity];

    const filtered = users.filter((user) => {
      const matchesName = user.username
        .toLowerCase()
        .includes(search.name.toLowerCase());

      const matchesGender =
        !search.gender ||
        search.gender === "any" ||
        user.gender.toLowerCase() === search.gender.toLowerCase();

      const matchesCountry = !search.country || user.country === search.country;

      const matchesAge = user.age >= minAge && user.age <= maxAge;

      return matchesName && matchesGender && matchesCountry && matchesAge;
    });
    console.log(filtered);
    console.log(users);
    setFilteredUsers(filtered);
  }

  return (
    <Stack
      spacing={{ xs: 2, sm: 2, md: 4 }}
      sx={{ width: "100%", overflowY: "auto", p: 4 }}
    >
      <Typography
        align="center"
        sx={{ typography: { xs: "h5", sm: "h5", md: "h4" } }}
      >
        Advanced Search
      </Typography>

      {filteredUsers.length === 0 ? (
        <Stack component="form" onSubmit={handleSubmit} spacing={2}>
          <TextField
            variant="outlined"
            label="Username"
            id="username"
            name="username"
            slotProps={{
              htmlInput: { maxLength: 15 },
            }}
            value={search.name}
            onChange={(e) => dispatch(setSearch({ name: e.target.value }))}
          />
          <FormControl>
            <InputLabel id="age">Age</InputLabel>
            <Select
              labelId="age"
              label="Age"
              id="age"
              value={search.ageRange}
              onChange={(e) =>
                dispatch(setSearch({ ageRange: e.target.value }))
              }
            >
              {ageRanges.map((range) => {
                return (
                  <MenuItem key={range} value={range}>
                    {range}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="gender">Gender</InputLabel>
            <Select
              labelId="gender"
              label="Gender"
              id="gender"
              value={search.gender}
              onChange={(e) => dispatch(setSearch({ gender: e.target.value }))}
            >
              <MenuItem value="any">Any</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <Autocomplete
              options={countries.map((country) => country.name)}
              renderInput={(params) => (
                <TextField {...params} label="Country" />
              )}
              value={search.country}
              onChange={(_, value) =>
                dispatch(setSearch({ country: value ?? "" }))
              }
            />
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Search />}
          >
            Search
          </Button>
        </Stack>
      ) : (
        <Stack spacing={1}>
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              id={user.id}
              username={user.username}
              age={user.age}
              gender={user.gender}
              country={user.country}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
