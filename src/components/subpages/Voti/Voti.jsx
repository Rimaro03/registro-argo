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
import { Typography, Grid, Paper } from "@mui/material";
import getVoti from "../../../api/getVoti";
import { red, green } from "@mui/material/colors";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

//TODO: GRAFICO VOTI
export default function Voti() {
  const [cookies] = useCookies();
  const [voti, setVoti] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [avg, setAvg] = useState([]);

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getVoti(cookies.token).then((votiArray) => {
      setVoti(votiArray);

      let months = [1, 2, 3, 4, 5, 6];

      let votiList = [];
      votiArray.forEach((voto) => {
        let votoNumber = voto.codVoto;
        if (votoNumber.includes("10")) {
          votoNumber = Number(voto.codVoto.slice(0, 2));
        } else {
          votoNumber = Number(voto.codVoto.slice(0, 1));
        }

        if (!months.includes(Number(voto.datGiorno.split("-")[1]))) {
          return;
        }

        votiList.push({ mese: voto.datGiorno.split("-")[1], voto: votoNumber });
      });
      setChartData(votiList);
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
        <Typography variant="h4" >Voti</Typography>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          >
            <ResponsiveContainer>
              <LineChart
                data={chartData.reverse()}
                margin={{
                  top: 16,
                  right: 16,
                  bottom: 0,
                }}
              >
                <XAxis dataKey="mese" hide={true} />
                <YAxis />
                <Line
                  name="voto"
                  type="monotone"
                  dataKey="voto"
                  stroke="#8884d8"
                />
                <CartesianGrid stroke="#ccc" />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <List>
          {voti.map((item, index) => {
            const docente = item.docente
              .replace("(", "")
              .replace(")", "")
              .replace("Prof. ", "");
            let voto = item.codVoto;
            if (voto.includes("10")) {
              voto = Number(item.codVoto.slice(0, 2));
            } else {
              voto = Number(item.codVoto.slice(0, 1));
            }

            let descrizione = "Nessuna descrizione";
            if (item.desProva) {
              descrizione = item.desProva;
            }
            let avatarColor = "";
            voto < 6 ? (avatarColor = red[500]) : (avatarColor = green[500]);

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
                  <Avatar sx={{ bgcolor: avatarColor }}>{item.codVoto}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", fontWeight: 600 }}
                        component="span"
                      >
                        {item.desMateria}
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
                        {descrizione}
                      </Typography>
                      <br />
                      {docente} | {item.datGiorno}
                    </React.Fragment>
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}