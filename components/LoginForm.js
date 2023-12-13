"use client";
import { validateEmail, validatePassword } from "@/lib/validations";
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

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassTypeText, setIsPassTypeText] = useState(false);
  const [snackNotification, setSnackNotification] = useState(false);
  const [snackNotificationStatus, setSnackNotificationStatus] = useState("");
  const [snackMessage, setSnackMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const body = await response.json();

      setSnackNotification(true);
      setSnackMessage(body.message);

      if (response.ok) {
        e.target.reset();
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
              Enter your login details
            </Typography>
            <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
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
              <Button
                className="spacingBottom"
                type="submit"
                fullWidth
                variant="contained"
                disabled={!validateEmail(email) || !validatePassword(password)}
              >
                Submit
              </Button>
            </form>
            <Box textAlign="center">
              <Typography variant="body2">
                Don't have an account? <Link href="/register">Sign Up</Link>
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

export default LoginForm;
