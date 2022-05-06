import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Box,
  List,
  Toolbar,
  Switch,
  Typography,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import apiRequest from "../../../api/apiRequest";
import GenPromemoria from "../../../gen/GenPromemoria";

export default function Promemoria() {
  const [cookies] = useCookies();
  const [checked, setChecked] = useState(true);
  const [promemoria, setPromemoria] = useState([]);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("promemoria").then((res) => {
      setPromemoria(res.dati);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.checked;
    setChecked(value);

    if (!value) {
      let newPromemoria = [];
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const current = new Date(
        `${new Date().getFullYear()}-${month}-${new Date().getDate()}`
      );
      promemoria.forEach((promemorio) => {
        if (new Date(promemorio.datGiorno) > current) {
          newPromemoria.push(promemorio);
        }
      });
      setPromemoria(newPromemoria);
    } else {
      apiRequest("promemoria").then((res) => {
        setPromemoria(res.dati);
      });
    }
  };

  const drawerWidth = 300;
  const current = new Date();
  let day = current.getDate() + 1;
  let month = current.getMonth() + 1;
  current.getMonth() + 1 < 10 ? (month = `0${month}`) : (month = month);
  let dataOggi = `${current.getFullYear() + "-" + month + "-" + day}`;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Menu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth / 5}px`,
        }}
      >
        <Toolbar />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4">Promemoria</Typography>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label="Mostra tutti"
            />
          </FormGroup>
        </Box>
        <List>
          {promemoria.map((item, index) => {
            return (
              <GenPromemoria
                item={item}
                index={index}
                dataOggi={dataOggi}
                key={index}
              />
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
