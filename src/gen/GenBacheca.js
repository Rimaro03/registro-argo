import React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";

export default function GenBacheca(props) {
  let Presavisione = <></>;
  if (props.item.richiediPv) {
    if (!props.item.dataConfermaPresaVisione) {
      Presavisione = (
        <Typography component="span">Presa visione non confermata!</Typography>
      );
    } else {
      Presavisione = (
        <Typography component="span">
          Presa visione: {props.item.dataConfermaPresaVisione}
        </Typography>
      );
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
              {props.item.desOggetto}
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
              {props.item.desMessaggio}
            </Typography>
            <br />
            {`${props.item.datGiorno} | ${props.item.allegati.length} allegati`}
            <br />
            {Presavisione}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
