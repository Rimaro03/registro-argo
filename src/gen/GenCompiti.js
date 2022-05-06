import React from "react";
import {
  Avatar,
  Box,
  FormControlLabel,
  FormGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import { green } from "@mui/material/colors";

export default function GenCompiti(props) {
  const docente = props.item.docente
    .replace("(", "")
    .replace(")", "")
    .replace("Prof. ", "");
  let color = green[500];
  if (props.dataOggi === props.item.datCompiti) {
    color = "#ffcc00";
  } else {
    if (new Date(props.item.datCompiti) < new Date(props.dataOggi)) {
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
              {props.item.desMateria}
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
              {props.item.desCompiti}
            </Typography>
            <br />
            {docente}, assegnati per il {props.item.datCompiti}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
