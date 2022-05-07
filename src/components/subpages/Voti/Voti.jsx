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
  Toolbar,
  Typography,
} from "@mui/material";
import GenVoti from "../../../gen/GenVoti";
import { red, green } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import apiRequest from "../../../api/apiRequest";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Voti() {
  const [cookies] = useCookies();
  const [voti, setVoti] = useState([]);

  const matches = useMediaQuery("(min-width:930px)");

  let drawerWidth = 300;
  if (!matches) {
    drawerWidth = 60;
  }

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("votigiornalieri").then((res) => {
      const newVoti = organizer(res.dati);
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
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>{item.materia}</Typography>
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
                        return (
                          <GenVoti item={item} index={index} key={index} />
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
