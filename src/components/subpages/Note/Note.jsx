import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, List, Toolbar, Typography } from "@mui/material";
import apiRequest from "../../../api/apiRequest";
import GenNote from "../../../gen/GenNote";

export default function Note() {
  const [cookies] = useCookies();
  const [note, setNote] = useState([]);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("notedisciplinari").then((res) => {
      setNote(res.dati);
    });
  }, []);

  const drawerWidth = 300;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Menu />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth / 5}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4">Note disciplinari</Typography>
        <List>
          {note.map((item, index) => {
            const docente = item.docente
              .replace("(", "")
              .replace(")", "")
              .replace("Prof. ", "");

            return <GenNote item={item} index={index} key={index} />;
          })}
        </List>
      </Box>
    </Box>
  );
}
