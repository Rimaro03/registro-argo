import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { Container } from "@mui/material"

const drawerWidth = 240;

export default function Menu() {
  const items = ["Riepilogo", "Voti", "Argomenti"];

  const drawer = (
    <div>
      <List>
        {items.map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );



  return (
    <Container>
      {drawer}
    </Container>
  );
}
