import React from "react";

import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { red } from "@mui/material/colors";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function GenNote(props) {
  const docente = props.item.docente
    .replace("(", "")
    .replace(")", "")
    .replace("Prof. ", "");

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
        <Avatar sx={{ bgcolor: red[500] }}>
          <PriorityHighIcon />
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
              {props.item.desNota}
            </Typography>
            <br />
            {props.item.datNota}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
