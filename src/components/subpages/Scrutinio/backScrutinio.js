import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useCookies } from "react-cookie";
import {
  Box,
  TableContainer,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import useMediaQuery from "@mui/material/useMediaQuery";
import apiRequest from "../../../api/apiRequest";

export default function Scrutinio() {
  const [cookies] = useCookies();
  const [scrutinio, setScrutinio] = useState([]);
  const [scrutinio2, setScrutinio2] = useState([]);
  const [datiScrutinio, setDatiScrutinio] = useState([]);
  const [datiScrutinio2, setDatiScrutinio2] = useState([]);
  const [scrutini, setScrutini] = useState({});
  const [chartData, setChartData] = useState([]);
  const [chartData2, setChartData2] = useState([]);
  const [checked, setChecked] = useState(false);

  const matches = useMediaQuery("(min-width:930px)");
  const matches2 = useMediaQuery("(min-width:1500px)");

  let drawerWidth = 300;
  if (!matches) {
    drawerWidth = 60;
  }

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    apiRequest("votiscrutinio").then((res) => {
      let scrutinioArray = [];
      let secondoScrutinioArray = [];
      let id = 0;
      res.forEach((dato) => {
        scrutinioArray.push({
          id: id,
          Materia: dato.desMateria,
          Voto: dato.votoOrale.codVoto,
          Assenze: dato.assenze,
        });
        id++;
      });
      if (scrutinioArray.length >= 15) {
        secondoScrutinioArray = scrutinioArray.slice(
          scrutinioArray.length / 2,
          scrutinioArray.length
        );

        scrutinioArray.splice(scrutinioArray.length / 2, scrutinioArray.length);
      }

      setScrutinio(scrutinioArray);
      let datas = scrutinioArray.map((item) => item);
      datas.splice(
        datas.findIndex((item) => item.Materia === "Religione Cattolica"),
        1
      );
      datas.splice(
        datas.findIndex((item) => item.Materia === "Comportamento"),
        1
      );
      setChartData(datas);

      setScrutinio2(secondoScrutinioArray);
      let datas2 = secondoScrutinioArray.map((item) => item);
      datas2.splice(
        datas2.findIndex((item) => item.Materia === "Religione Cattolica"),
        1
      );
      datas2.splice(
        datas2.findIndex((item) => item.Materia === "Comportamento"),
        1
      );
      setChartData2(datas2);
    });

    apiRequest("periodiclasse").then((res) => {
      let periodi = {
        primo: false,
        secondo: false,
      };

      if (res.dati[0].flgVotiVisibili) {
        periodi.primo = true;
      }
      if (res.dati[1].flgVotiVisibili) {
        periodi.secondo = true;
      }

      setScrutini(periodi);
      console.log(periodi);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.checked;
    setChecked(value);
  };

  const createData = (materia, voto, assenze) => {
    return { materia, voto, assenze };
  };

  const colonne = ["Materia", "Voto", "Assenze"];

  const primoScrutinioTable = () => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minwidth: 680 }} aria-label="Voti">
          <TableHead>
            <TableRow>
              {colonne.map((colonna, index) => (
                <TableCell key={index} align="left">
                  <strong>{colonna}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datiScrutinio.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.materia}
                </TableCell>
                <TableCell align="left">{row.voto}</TableCell>
                <TableCell align="left">{row.assenze}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const loadPrimoScrutinio = () => {
    if (scrutini.primo) {
      let datiPrimoScrutinio = [];
      scrutinio.forEach((voto) => {
        datiPrimoScrutinio.push(
          createData(voto.Materia, voto.Voto, voto.Assenze)
        );
      });
      setDatiScrutinio(datiPrimoScrutinio);
      return (
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="h4">Primo scrutinio</Typography>
            {primoScrutinioTable()}
          </Box>
          <Box>
            {loadCompareSwitch()}
            {checkLoader()}
          </Box>
        </Box>
      );
    }
  };

  const loadChart = (datas) => {
    if (matches2) {
      return (
        <RadarChart
          outerRadius={180}
          width={tableWidth}
          height={750}
          data={datas}
          sx={{}}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="Materia" stroke="white" />
          <PolarRadiusAxis angle={54} domain={[0, 10]} display="none" />
          <Radar
            name="Alunno"
            dataKey="Voto"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      );
    }
  };

  const loadCompareSwitch = () => {
    if (scrutini.secondo) {
      return (
        <FormGroup sx={{ alignContent: "flex-end" }}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Confronta periodi"
          />
        </FormGroup>
      );
    }
  };

  const secondoScrutinioTable = () => {
    return (
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table sx={{ minwidth: 680 }} aria-label="Voti">
          <TableHead>
            <TableRow>
              {colonne.map((colonna, index) => (
                <TableCell key={index} align="left">
                  <strong>{colonna}</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {datiScrutinio2.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.materia}
                </TableCell>
                <TableCell align="left">{row.voto}</TableCell>
                <TableCell align="left">{row.assenze}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const loadSecondoScrutinio = () => {
    if (scrutini.secondo) {
      let datiSecondoScrutinio = [];
      scrutinio2.forEach((voto) => {
        datiSecondoScrutinio.push(
          createData(voto.Materia, voto.Voto, voto.Assenze)
        );
      });
      setDatiScrutinio2(datiSecondoScrutinio);
      return (
        <Box sx={{ pt: 17, display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <Typography variant="h4">Scrutinio Finale</Typography>
            {secondoScrutinioTable()}
          </Box>
        </Box>
      );
    }
  };

  const checkLoader = () => {
    if (!checked) {
      return loadChart(chartData);
    } else {
      return loadSecondoScrutinio();
    }
  };

  const tableWidth = 750;

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
          width: `calc(100% - ${drawerWidth}px - ${tableWidth}px)`,
          ml: `${drawerWidth / 5}px`,
          mt: 10,
        }}
      >
        {loadPrimoScrutinio()}
        {loadSecondoScrutinio()}
      </Box>
    </Box>
  );
}
