import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { subPages } from "./menuItems";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";

const drawerWidth = 300;

export default function Menu() {

  return (
    <>
      <CssBaseline />
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {subPages.map((page, index) => (
            <ListItem button onClick={()=>{window.location.href=`/${page.name.toLocaleLowerCase()}`}} key={index}>
              <ListItemIcon>
                {page.icon}
              </ListItemIcon>
              <ListItemText primary={page.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
