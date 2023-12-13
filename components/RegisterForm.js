"use client";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/lib/validations";
import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Link from "next/link";
import { useRouter } from "next/navigation";
const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassTypeText, setIsPassTypeText] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfPassTypeText, setIsConfPassTypeText] = useState(false);
  const [snackNotification, setSnackNotification] = useState(false);
  const [snackNotificationStatus, setSnackNotificationStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");
  const router = useRouter();
  /**
   *
   * @param {import("react").SyntheticEvent} e
   * @returns
   */
  async function handleSubmit(e) {
    e.preventDefault();
    if (
      !validateName(firstName) ||
      !validateName(lastName) ||
      !validateEmail(email) ||
      !validatePassword(password) ||
      confirmPassword !== password
    )
      return;
    try {
      const response = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });
      const body = await response.json();

      setSnackNotification(true);
      setSnackMessage(body.message);

      if (response.ok) {
        e.target.reset();
        router.push("/");
        setSnackNotificationStatus("success");
      } else {
        setSnackNotificationStatus("error");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
          <Card
            className="cardBorderDesign"
            sx={{ padding: "1rem", minWidth: "40hw" }}
          >
            <Typography variant="h4" gutterBottom>
              Registration Form
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                className="spacingBottom"
                variant="outlined"
                name="firstName"
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                error={firstName.length > 0 && !validateName(firstName)}
                fullWidth
                placeholder="Enter your First Name"
              />
              <TextField
                className="spacingBottom"
                variant="outlined"
                name="lastName"
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                error={lastName.length > 0 && !validateName(lastName)}
                fullWidth
                placeholder="Enter your Last Name"
              />

              <TextField
                className="spacingBottom"
                variant="outlined"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                error={email.length > 0 && !validateEmail(email)}
                fullWidth
                placeholder="Enter your email"
              />
              <TextField
                className="spacingBottom"
                variant="outlined"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type={isPassTypeText ? "text" : "password"}
                error={password.length > 0 && !validatePassword(password)}
                fullWidth
                placeholder="Enter your Password"
                autoComplete="on"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setIsPassTypeText((prev) => !prev)}
                    >
                      {isPassTypeText ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />
              <TextField
                className="spacingBottom"
                variant="outlined"
                name="confirmPassword"
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={isConfPassTypeText ? "text" : "password"}
                error={confirmPassword !== password}
                fullWidth
                placeholder="Re-enter your password"
                autoComplete="on"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setIsConfPassTypeText((prev) => !prev)}
                    >
                      {isConfPassTypeText ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  ),
                }}
              />

              <Button
                className="spacingBottom"
                type="submit"
                fullWidth
                variant="contained"
                disabled={
                  !validateName(firstName) ||
                  !validateName(lastName) ||
                  !validateEmail(email) ||
                  !validatePassword(password) ||
                  confirmPassword !== password
                }
              >
                Submit
              </Button>
            </form>
            <Box textAlign="center">
              <Typography variant="body2">
                Already have an account? <Link href="/">Sign Up</Link>
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Snackbar
        open={snackNotification}
        autoHideDuration={6000}
        onClose={() => setSnackNotification(false)}
      >
        <Alert
          onClose={() => setSnackNotification(false)}
          severity={snackNotificationStatus}
          sx={{ width: "100%" }}
        >
          {snackMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default RegisterForm;
