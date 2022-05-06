import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, List, Toolbar, Typography } from "@mui/material";
import apiRequest from "../../../api/apiRequest";
import GenArgomenti from "../../../gen/GenArgomenti";

export default function Argomenti() {
  const [cookies] = useCookies();
  const [argomenti, setArgomenti] = useState([]);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("argomenti").then((res) => {
      const newArgomenti = organizer(res.dati);
      setArgomenti(newArgomenti);
    });
  }, []);

  const organizer = (argomentiList) => {
    let newArgomenti = [];
    argomentiList.forEach((argomento) => {
      let exists = false;
      newArgomenti.forEach((newArgomento) => {
        if (newArgomento.data == argomento.datGiorno) {
          exists = true;
          newArgomento.argomenti.push(argomento);
        }
      });
      if (!exists) {
        newArgomenti.push({
          data: argomento.datGiorno,
          argomenti: [argomento],
        });
      }
    });
    return newArgomenti;
  };

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
        <Typography variant="h4">Argomenti</Typography>
        <List sx={{ marginTop: 4 }}>
          {argomenti.map((item, index) => {
            return (
              <div key={index}>
                <Typography variant="h6">{item.data}</Typography>
                <List>
                  {item.argomenti.map((argomento, index) => {
                    return (
                      <GenArgomenti
                        item={argomento}
                        index={index}
                        key={index}
                      />
                    );
                  })}
                </List>
              </div>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
