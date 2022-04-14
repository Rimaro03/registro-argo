import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import getVoti from "../../../api/getVoti";
import { red, green } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Voti() {
  const [cookies] = useCookies();
  const [voti, setVoti] = useState([]);

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getVoti(cookies.token).then((votiArray) => {
      const newVoti = organizer(votiArray);
      setVoti(newVoti);
    });
  }, []);

  const organizer = (votiList) => {
    let newVoti = [];
    votiList.forEach((voto) => {
      let exists = false;
      newVoti.forEach((newVoto) => {
        if (newVoto.materia && voto.desMateria.includes(newVoto.materia)) {
          exists = true;
          newVoto.voti.push(voto);
        }
      });
      if (!exists) {
        newVoti.push({
          materia: voto.desMateria,
          voti: [voto],
        });
      }
    });
    return newVoti;
  };

  const calcMedia = (votiList) => {
    let media = 0;
    votiList.forEach((voto) => {
      media += voto;
    });
    media = media / votiList.length;
    return media.toFixed(2);
  };

  const drawerWidth = 300;

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
        <Typography variant="h4">Voti</Typography>
        <List>
          {voti.map((item, index) => {
            let votiList = [];
            item.voti.forEach((voto) => {
              votiList.push(voto.decValore);
            });
            return (
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {item.materia}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div key={index}>
                    <List>
                      <ListItem>
                        <ListItemText
                          /*primary={
                          <React.Fragment>
                            <Typography variant="h6" component="span">
                              {item.materia}
                            </Typography>
                          </React.Fragment>
                        }*/
                          primary={
                            <React.Fragment>
                              <Typography variant="h6">{`Media: ${calcMedia(
                                votiList
                              )}`}</Typography>
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                    </List>
                    <Divider />
                    <List>
                      {item.voti.map((item, index) => {
                        const docente = item.docente
                          .replace("(", "")
                          .replace(")", "")
                          .replace("Prof. ", "");

                        let voto = item.decValore;

                        let tipologia = "";
                        if (item.codVotoPratico === "S") {
                          tipologia = "Compito Scritto";
                        } else {
                          if (item.codVotoPratico === "N") {
                            tipologia = "Interrogazione orale";
                          } else {
                            tipologia = "Prova pratica";
                          }
                        }

                        let descrizione = "Nessuna descrizione";
                        if (item.desProva) {
                          descrizione = item.desProva;
                        }

                        let avatarColor = "";
                        voto < 6
                          ? (avatarColor = red[500])
                          : (avatarColor = green[500]);

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
                              <Avatar sx={{ bgcolor: avatarColor }}>
                                {item.codVoto}
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <React.Fragment>
                                  <Typography
                                    sx={{ display: "inline", fontWeight: 600 }}
                                    component="span"
                                  >
                                    {descrizione}
                                  </Typography>
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
                                    {tipologia}
                                  </Typography>
                                  <br />
                                  {docente} | {item.datGiorno}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                        );
                      })}
                    </List>
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
