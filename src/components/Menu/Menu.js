import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MailIcon from "@mui/icons-material/Mail";
import Toolbar from "@mui/material/Toolbar";
import { subPages } from "./menuItems";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom";

export default function Menu() {
  const matches = useMediaQuery("(min-width:930px)");

  let drawerWidth = 300;
  let width = 240;
  if (!matches) {
    drawerWidth = 60;
    width = 50;
  }

  return (
    <>
      <CssBaseline />
      <Drawer
        sx={{
          width: width,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {subPages.map((page, index) => {
            let pageName = `/${page.name.toLocaleLowerCase()}`;
            return (
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={pageName}
              >
                <ListItem button key={index}>
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText primary={page.name} />
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Drawer>
    </>
  );
}
