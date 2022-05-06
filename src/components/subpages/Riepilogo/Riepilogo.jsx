import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import apiRequest from "../../../api/apiRequest";

export default function Riepilogo() {
  const [cookies, setCookie] = useCookies();
  const [tipi, setTipi] = useState([]);
  const [news, setNews] = useState([]);

  const nomi = {
    Bacheca: ["desMessaggio", "desOggetto"],
    "Assenze/Ritardi/Permessi": [null],
    "Argomenti lezione": ["desArgomento", "desMateria", "docente"],
    "Compiti assegnati": ["desCompiti", "desMateria", "docente", "datGiorno"],
  };

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    let month = new Date().getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const current = `${new Date().getFullYear()}-${month}-${
      new Date().getDate() - 5
    }`;
    apiRequest(`oggi?datGiorno=${current}`).then((res) => {
      let tipi = [];
      res.dati.forEach((dato) => {
        if (!tipi.includes(dato.titolo)) {
          tipi.push(dato.titolo);
        }
      });
      setTipi(tipi);

      let news = [];
      tipi.forEach((tipo) => {
        let attivita = [];
        res.dati.forEach((dato) => {
          if (dato.titolo == tipo) {
            attivita.push(dato);
          }
        });
        news.push(attivita);
      });

      setNews(news);
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
        <Typography variant="h4">Resoconto</Typography>
        <List>
          {tipi.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemText>
                  <Typography variant="h5">{item}</Typography>
                </ListItemText>
                <List>
                  {news[index].map((item2, index2) => {
                    console.log(item2);
                    return (
                      <ListItem key={index2}>
                        <ListItemText>{item2.dati.desCompiti}</ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
