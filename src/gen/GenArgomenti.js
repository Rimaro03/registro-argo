import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

export default function GenArgomenti(props) {
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
        <Avatar sx={{ bgcolor: blue[500] }}>
          <LibraryBooksIcon />
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
              {props.item.desArgomento}
            </Typography>
            <br />
            {docente}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
