import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function GenPromemoria(props) {
  const docente = props.item.desMittente
    .replace("(", "")
    .replace(")", "")
    .replace("Prof. ", "");

  let color = green[500];
  if (props.dataOggi === props.item.datGiorno) {
    color = "#ffcc00";
  } else {
    if (new Date(props.item.datGiorno) < new Date(props.dataOggi)) {
      color = "#AAAAAA";
    }
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
        <Avatar sx={{ bgcolor: color }}>
          <AssignmentIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline", fontWeight: 600 }}
              component="span"
            >
              {docente}
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
              {props.item.desAnnotazioni}
            </Typography>
            <br />
            {props.item.datGiorno}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
