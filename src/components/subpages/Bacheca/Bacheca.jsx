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
  Button,
  Accordion,
  AccordionSummary,
  ListItemSecondaryAction,
  AccordionDetails,
  ListItemButton,
  Divider,
  Collapse,
  ListItemIcon,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import getBacehca from "../../../api/getBacheca";
import setPresaVisione from "../../../api/setPresaVisione";
import getAllegato from "../../../api/getAllegato";
import ArticleIcon from "@mui/icons-material/Article";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";
import { render } from "@testing-library/react";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Bacheca() {
  const [cookies] = useCookies();
  const [bacheca, setBacheca] = useState([]);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState();

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getBacehca(cookies.token).then((bachecaArray) => {
      setBacheca(bachecaArray);
    });
  }, []);

  const handlePresaVisione = (comunicazione) => {
    setPresaVisione(cookies.token, comunicazione.prgMessaggio).then(
      (response) => {
        if (
          response.message ==
          "Per confermare la presa visione, è necessario scaricare almeno un allegato."
        ) {
          setSnack(
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Scarica almeno un allegato per confermare la presa visione!
            </Alert>
          );
        } else {
          setSnack(
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Presa visione confermata!
            </Alert>
          );
        }
        setOpen(true);
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDownloadAllegato = (allegato) => {
    getAllegato(
      cookies.token,
      allegato.prgMessaggio,
      allegato.prgAllegato
    ).then((response) => {
      window.open(response.url);
    });
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
        <Typography variant="h4">Bacheca</Typography>
        <List>
          {bacheca.map((item, index) => {
            let Presavisione = <></>;
            if (item.richiediPv) {
              if (!item.dataConfermaPresaVisione) {
                Presavisione = (
                  <Button
                    edge="end"
                    variant="contained"
                    sx={{ marginTop: 1 }}
                    onClick={() => {
                      handlePresaVisione(item);
                    }}
                    startIcon={<VisibilityIcon />}
                  >
                    Prendi visione
                  </Button>
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
                    <List>
                      {item.allegati.map((allegato, index) => {
                        return (
                          <ListItem key={index}>
                            <ListItemButton
                              onClick={() => {
                                handleDownloadAllegato(allegato);
                              }}
                            >
                              <ListItemIcon>
                                <Avatar>
                                  <AttachEmailIcon />
                                </Avatar>
                              </ListItemIcon>
                              <ListItemText>{allegato.desFile}</ListItemText>
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
