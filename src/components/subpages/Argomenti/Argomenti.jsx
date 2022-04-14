import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import getArgomenti from "../../../api/getArgomenti";
import { blue } from "@mui/material/colors";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

export default function Argomenti() {
  const [cookies] = useCookies();
  const [argomenti, setArgomenti] = useState([]);

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getArgomenti(cookies.token).then((argomentiArray) => {
      const newArgomenti = organizer(argomentiArray);
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
        <List sx={{marginTop: 4}}>
          {argomenti.map((item, index) => {
            return (
              <div key={index}>
                <Typography variant="h6">{item.data}</Typography>
                <List>
                  {item.argomenti.map((argomento, index) => {
                    const docente = argomento.docente
                      .replace("(", "")
                      .replace(")", "")
                      .replace("Prof. ", "");
                    return (
                      <ListItem
                        key={index}
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
                                {argomento.desMateria}
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
                                {argomento.desArgomento}
                              </Typography>
                              <br />
                              {docente}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
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
