import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import {
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DoneIcon from "@mui/icons-material/Done";
import { green } from "@mui/material/colors";
import apiRequest from "../../../api/apiRequest";

//TODO: RIEPILOGO ASSENZE
export default function Assenze() {
  const [cookies] = useCookies();
  const [assenze, setAssenze] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("assenze").then((res) => {
      setAssenze(res.dati);

      let assenze = 0;
      let ingressi = 0;
      let uscite = 0;
      res.dati.forEach((item) => {
        switch (item.codEvento) {
          case "A":
            assenze++;
            break;
          case "I":
            ingressi++;
            break;
          case "U":
            uscite++;
            break;
          default:
            break;
        }
      });
      setChartData({
        assenze: assenze,
        ingressi: ingressi,
        uscite: uscite,
      });
    });
  }, []);

  const drawerWidth = 300;
  const tableWidth = 300;

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Menu />
      <Box
        component="main"
        sx={{
          bgcolor: "background.default",
          p: 3,
          width: `calc(100% - ${drawerWidth}px - ${tableWidth}px)`,
          ml: `${drawerWidth / 5}px`,
        }}
      >
        <Toolbar />
        <Typography variant="h4">Presenze</Typography>
        <List>
          {assenze.map((item, index) => {
            const docente = item.registrataDa
              .replace("(", "")
              .replace(")", "")
              .replace("Prof. ", "");
            let evento = "";
            switch (item.codEvento) {
              case "A":
                evento = `Assenza del ${item.datAssenza}`;
                break;
              case "I":
                evento = `Ingresso alle ${item.oraAssenza.split(" ")[1]}`;
                break;
              case "U":
                evento = `Uscita alle ${item.oraAssenza.split(" ")[1]}`;
                break;
              default:
                break;
            }

            let giustificata = "Da Giustificare!";
            let icon = <WarningAmberIcon />;
            let color = "#ffcc00";
            if (item.giustificataDa) {
              giustificata = `Giustificata da ${item.giustificataDa
                .replace("(", "")
                .replace(")", "")
                .replace("Prof. ", "")}`;
              icon = <DoneIcon />;
              color = green[500];
            }
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
                  <Avatar sx={{ bgcolor: color }}>{icon}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", fontWeight: 600 }}
                        component="span"
                      >
                        {evento}
                      </Typography>
                      <br />
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
                        {giustificata}
                      </Typography>
                      <br />
                      Segnata da {docente} | {item.datAssenza}
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ width: tableWidth, height: 150, marginTop: 18, marginRight: 3 }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Assenze</TableCell>
              <TableCell align="right">Ingressi</TableCell>
              <TableCell align="right">Uscite</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={chartData.assenze}>
              <TableCell align="center">{chartData.assenze}</TableCell>
              <TableCell align="center">{chartData.ingressi}</TableCell>
              <TableCell align="center">{chartData.uscite}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
