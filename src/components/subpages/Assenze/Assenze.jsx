import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import {
  Box,
  List,
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
import apiRequest from "../../../api/apiRequest";
import GenAssenze from "../../../gen/GenAssenze";
import useMediaQuery from "@mui/material/useMediaQuery";

//TODO: RIEPILOGO ASSENZE
export default function Assenze() {
  const [cookies] = useCookies();
  const [assenze, setAssenze] = useState([]);
  const [chartData, setChartData] = useState([]);

  const matches = useMediaQuery("(min-width:930px)");

  let drawerWidth = 300;
  let tableWidth = 400;
  let table = (<TableContainer
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
  )
  if (!matches) {
    drawerWidth = 60;
    table = <></>
    tableWidth = 0;
  }

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
            return <GenAssenze item={item} index={index} key={index} />;
          })}
        </List>
      </Box>
      {table}
    </Box>
  );
}
