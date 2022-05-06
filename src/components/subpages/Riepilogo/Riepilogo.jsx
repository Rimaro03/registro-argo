import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import apiRequest from "../../../api/apiRequest";
import GenArgomenti from "../../../gen/GenArgomenti";
import GenAssenze from "../../../gen/GenAssenze";
import GenCompiti from "../../../gen/GenCompiti";
import GenNote from "../../../gen/GenNote";
import GenPromemoria from "../../../gen/GenPromemoria";
import GenVoti from "../../../gen/GenVoti";
import GenBacheca from "../../../gen/GenBacheca";

export default function Riepilogo() {
  const [cookies, setCookie] = useCookies();
  const [tipi, setTipi] = useState([]);
  const [news, setNews] = useState([]);
  const [date, setDate] = useState("");

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    let month = new Date().getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const current = `${new Date().getFullYear()}-${month}-${new Date().getDate()}`;
    setDate(current);
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
        <Typography variant="h4">Resoconto {date}</Typography>
        <List sx={{ marginTop: 4 }}>
          {tipi.map((item, index) => {
            return (
              <>
                <ListItemText>
                  <Typography variant="h5">{item}</Typography>
                </ListItemText>
                <List>
                  {news[index].map((item2, index2) => {
                    let Object = <p key={index2}>Error</p>;

                    switch (item) {
                      case "Compiti assegnati":
                        Object = (
                          <GenCompiti
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      case "Argomenti lezione":
                        Object = (
                          <GenArgomenti
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      case "Promemoria":
                        Object = (
                          <GenPromemoria
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      case "Assenze/Ritardi/Permessi":
                        Object = (
                          <GenAssenze
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      case "Voti Giornalieri":
                        Object = (
                          <GenVoti
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      case "Bacheca":
                        Object = (
                          <GenBacheca
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      case "Note Disciplinari":
                        Object = (
                          <GenNote
                            item={item2.dati}
                            index={index2}
                            key={index2}
                          />
                        );
                        break;

                      default:
                        break;
                    }

                    return Object;
                  })}
                </List>
              </>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
