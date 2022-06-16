import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, List, Toolbar, Typography } from "@mui/material";
import apiRequest from "../../../api/apiRequest";
import GenNote from "../../../gen/GenNote";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";

export default function Note() {
  const [cookies] = useCookies();
  const [note, setNote] = useState([]);
  const navigate = useNavigate();

  const matches = useMediaQuery("(min-width:930px)");

  let drawerWidth = 300;
  if (!matches) {
    drawerWidth = 60;
  }

  useEffect(() => {
    if (!cookies.session) {
      navigate("/login");
    }

    apiRequest("notedisciplinari").then((res) => {
      setNote(res.dati);
    });
  }, []);

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
