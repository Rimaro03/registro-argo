import React from "react";
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
} from "@mui/material";
import { red, green } from "@mui/material/colors";

/*const genCompiti = () => {};
const genArgomenti = () => {};
const genPromemoria = () => {};
const genBacheca = () => {};
const genNote = () => {};
const genAssenze = () => {};*/

export default function GenVoti(props) {
  const docente = props.item.docente
    .replace("(", "")
    .replace(")", "")
    .replace("Prof. ", "");

  let voto = props.item.decValore;

  let tipologia = "";
  if (props.item.codVotoPratico === "S") {
    tipologia = "Compito Scritto";
  } else {
    if (props.item.codVotoPratico === "N") {
      tipologia = "Interrogazione orale";
    } else {
      tipologia = "Prova pratica";
    }
  }

  let descrizione = "Nessuna descrizione";
  if (props.item.desProva) {
    descrizione = props.item.desProva;
  }

  let avatarColor = "";
  voto < 6 ? (avatarColor = red[500]) : (avatarColor = green[500]);

  return (
    <ListItem
      key={props.index}
      sx={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        margin: 1,
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: avatarColor }}>{props.item.codVoto}</Avatar>
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
            {docente} | {props.item.datGiorno}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
