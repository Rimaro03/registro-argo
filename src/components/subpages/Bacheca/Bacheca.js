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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemButton,
  ListItemIcon,
  Snackbar,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import setPresaVisione from "../../../api/setPresaVisione";
import getAllegato from "../../../api/getAllegato";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import apiRequest from "../../../api/apiRequest";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Bacheca() {
  const [cookies] = useCookies();
  const [bacheca, setBacheca] = useState([]);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState();
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width:930px)");

  let drawerWidth = 300;
  if (!matches) {
    drawerWidth = 60;
  }

  useEffect(() => {
    if (!cookies.session) {
      navigate("/login");
    }

    apiRequest("bachecanuova").then((res) => {
      setBacheca(res.dati);
    });
  }, []);

  const handlePresaVisione = (comunicazione) => {
    setPresaVisione(
      window.localStorage.getItem("token"),
      comunicazione.prgMessaggio
    ).then((response) => {
      setSnack(
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Presa visione confermata!
        </Alert>
      );
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadAllegato = (allegato, comunicazione) => {
    getAllegato(
      window.localStorage.getItem("token"),
      allegato.prgMessaggio,
      allegato.prgAllegato
    ).then((response) => {
      window.open(response.url);
    });

    handlePresaVisione(comunicazione);
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
        <Typography variant="h4">Bacheca</Typography>
        <List>
          {bacheca.map((item, index) => {
            let Presavisione = <></>;
            if (item.richiediPv) {
              if (!item.dataConfermaPresaVisione) {
                Presavisione = (
                  <Typography component="span">
                    Presa visione non confermata!
                  </Typography>
                );
              } else {
                Presavisione = (
                  <Typography component="span">
                    Presa visione: {item.dataConfermaPresaVisione}
                  </Typography>
                );
              }
            }

            let Allegati = <></>;
            if (item.allegati.length > 0) {
              Allegati = (
                <Accordion sx={{ marginTop: 1 }}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography component="span">
                      {item.allegati.length} allegati
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List component={"span"}>
                      {item.allegati.map((allegato, index) => {
                        let allegatiNome = `File ${index}`;
                        if (matches) {
                          allegatiNome = allegato.desFile;
                        }
                        return (
                          <ListItem key={index} component={"span"}>
                            <ListItemButton
                              onClick={() => {
                                handleDownloadAllegato(allegato, item);
                              }}
                            >
                              <ListItemIcon>
                                <Avatar>
                                  <AttachEmailIcon />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText>{allegatiNome}</ListItemText>
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              );
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
                  <Avatar>
                    <ArticleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", fontWeight: 600 }}
                        component="span"
                      >
                        {item.desOggetto}
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
                        {item.desMessaggio}
                      </Typography>
                      <br />
                      {item.datGiorno}
                      <br />
                      {Presavisione}
                      <br />
                      {Allegati}
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        {snack}
      </Snackbar>
    </Box>
  );
}
