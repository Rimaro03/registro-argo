import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DoneIcon from "@mui/icons-material/Done";
import { green } from "@mui/material/colors";

export default function GenAssenze(props) {
  console.log(props);
  const docente = props.item.registrataDa
    .replace("(", "")
    .replace(")", "")
    .replace("Prof. ", "");
  let evento = "";
  switch (props.item.codEvento) {
    case "A":
      evento = `Assenza del ${props.item.datAssenza}`;
      break;
    case "I":
      evento = `Ingresso alle ${props.item.oraAssenza.split(" ")[1]}`;
      break;
    case "U":
      evento = `Uscita alle ${props.item.oraAssenza.split(" ")[1]}`;
      break;
    default:
      break;
  }

  let giustificata = "Da Giustificare!";
  let icon = <WarningAmberIcon />;
  let color = "#ffcc00";
  if (props.item.giustificataDa) {
    giustificata = `Giustificata da ${props.item.giustificataDa
      .replace("(", "")
      .replace(")", "")
      .replace("Prof. ", "")}`;
    icon = <DoneIcon />;
    color = green[500];
  }
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
        <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline", fontWeight: 600 }}
              component="span"
            >
              {evento}
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
              {giustificata}
            </Typography>
            <br />
            Segnata da {docente} | {props.item.datAssenza}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
