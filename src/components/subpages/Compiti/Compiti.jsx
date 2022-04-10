import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import getCompiti from "../../../api/getCompiti";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { green } from "@mui/material/colors";

export default function Compiti() {
  const [cookies] = useCookies();
  const [compiti, setCompiti] = useState([]);
  const [checked, setChecked] = React.useState(true);

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getCompiti(cookies.token).then((compitiArray) => {
      setCompiti(compitiArray);
    });
  }, []);

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
        <Box sx={{display: "flex", justifyContent:"space-between"}}>
          <Typography variant="h4">Compiti assegnati</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
            defaultChecked
          />
        </Box>
        <List>
          {compiti.map((item, index) => {
            const docente = item.docente
              .replace("(", "")
              .replace(")", "")
              .replace("Prof. ", "");
            let color = green[500];
            if (dataOggi === item.datCompiti) {
              color = "#ffcc00";
            } else {
              if (new Date(item.datCompiti) < new Date(dataOggi)) {
                color = "#AAAAAA";
              }
            }
            return (
              <ListItem
                key={index}
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  margin: 1,
                }}
              >
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: color }}>
                    <DescriptionIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", fontWeight: 600 }}
                        component="span"
                      >
                        {item.desMateria}
                      </Typography>
                      <br />
                    </React.Fragment>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {item.desCompiti}
                      </Typography>
                      <br />
                      {docente}, assegnati per il {item.datCompiti}
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
