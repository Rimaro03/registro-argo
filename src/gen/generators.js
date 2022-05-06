import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";

const genCompiti = () => {};
const genArgomenti = () => {};
const genPromemoria = () => {};
const genBacheca = () => {};
const genNote = () => {};
const genAssenze = () => {};
const genVoti = (item, index) => {
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
  voto < 6 ? (avatarColor = red[500]) : (avatarColor = green[500]);

  <ListItem
    key={index}
    sx={{
      border: "1px solid #ccc",
      borderRadius: "5px",
      margin: 1,
    }}
  >
    <ListItemAvatar>
      <Avatar sx={{ bgcolor: avatarColor }}>{item.codVoto}</Avatar>
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
  </ListItem>;
};
