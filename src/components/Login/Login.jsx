import * as React from "react";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useCookies } from "react-cookie";
import getToken from "../../api/getToken";
import { nanoid } from "nanoid";
import getAlunnoData from "../../api/getAlunnoData";

export default function SignIn() {
  const [cookies, setCookie] = useCookies();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [codScuola, setCodScuola] = useState("");

  useEffect(() => {
    if (cookies.token) {
      window.location.href = "/riepilogo";
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getToken(username, password, codScuola).then(
      (res) => res
    );

    if (!token) {
      alert("Credenziali errate");
    } else {
      setCookie("session", nanoid(), { path: "/" });

      await getAlunnoData(token).then((res) => {
        console.log(`ALUNNO DATA\,${JSON.stringify(res)}`);
        window.localStorage.setItem("alunnoData", JSON.stringify(res));
      });

      window.location.href = "/riepilogo";
      window.localStorage.setItem("token", token);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="codScuola"
            label="Codice scuola"
            name="codScuola"
            autoComplete="codScuola"
            autoFocus
            onChange={(event) => setCodScuola(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
