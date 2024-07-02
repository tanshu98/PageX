import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface ISignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SingUpFunctional = () => {
  const [signupData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value, e.target.name);
    const { name, value } = e.target;
    setSignUpData({
      ...signupData,
      [name]: value,
    });
  };
  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(signupData);
  };

  return (
    <form onSubmit={handleSignUp} >
      <Box sx={{display: 'flex', flexDirection: 'column', textAlign: 'center',m:'auto',width:"30%"}}>
        <Typography variant="h4">Sign Up</Typography>
        <TextField
          variant="outlined"
          value={signupData.name}
          name="name"
          required
          onChange={handleChange}
          placeholder="Name"
        />
        <TextField
          variant="outlined"
          value={signupData.email}
          name="email"
          required
          onChange={handleChange}
          placeholder="Email"
        />
        <TextField
          variant="outlined"
          value={signupData.password}
          name="password"
          required
          onChange={handleChange}
          placeholder="Password"
        />
        <TextField
          variant="outlined"
          value={signupData.confirmPassword}
          name="confirmPassword"
          required
          onChange={handleChange}
          placeholder="Confirm Password"
        />
        <Button type="submit" variant="contained">
          Sign Up
        </Button>
      </Box>
    </form>
  );
};

export default SingUpFunctional;

// Name, Email, Password, Confirm Password
