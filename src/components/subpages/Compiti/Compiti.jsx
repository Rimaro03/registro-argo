import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import {
  Box,
  FormControlLabel,
  FormGroup,
  List,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import apiRequest from "../../../api/apiRequest";
import GenCompiti from "../../../gen/GenCompiti";

export default function Compiti() {
  const [cookies] = useCookies();
  const [compiti, setCompiti] = useState([]);
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("compiti").then((res) => {
      setCompiti(res.dati);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.checked;
    setChecked(value);

    if (!value) {
      let newCompiti = [];
      let month = new Date().getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      const current = new Date(
        `${new Date().getFullYear()}-${month}-${new Date().getDate()}`
      );
      compiti.forEach((compito) => {
        if (new Date(compito.datCompiti) > current) {
          newCompiti.push(compito);
        }
      });
      setCompiti(newCompiti);
    } else {
      apiRequest("compiti").then((res) => {
        setCompiti(res.dati);
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
          <Typography variant="h4">Compiti assegnati</Typography>
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
          {compiti.map((item, index) => {
            return (
              <GenCompiti
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
