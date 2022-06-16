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
  const [periodi, setPeriodi] = useState({});
  const [datiPrimoScrutinio, setDatiPrimoScrutinio] = useState([]);
  const [datiSecondoScrutinio, setDatiSecondoScrutinio] = useState([]);
  const [datiGrafPrimoScrutinio, setDatiGrafPrimoScrutinio] = useState([]);
  const [datiGrafSecondoScrutinio, setDatiGrafSecondoScrutinio] = useState([]);
  const [checked, setChecked] = useState(false);

  const matches = useMediaQuery("(min-width:930px)");
  const matches2 = useMediaQuery("(min-width:1500px)");

  const tableWidth = 750;

  let drawerWidth = 300;
  if (!matches) {
    drawerWidth = 60;
  }

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    //mi riprendo i periodi (quadrimestre)
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

      setPeriodi(periodi);

      //mi riprendo i dati dello scrutinio
      apiRequest("votiscrutinio").then((res) => {
        let primoScrutinioArray = [];
        let secondoScrutinioArray = [];

        res.forEach((dato) => {
          primoScrutinioArray.push({
            materia: dato.desMateria,
            voto: dato.votoOrale.codVoto,
            assenze: dato.assenze,
          });
        });

        //controllo se c'è anche il secondo assieme, se c'è mi riprendo i suoi valori
        if (periodi.secondo) {
          secondoScrutinioArray = primoScrutinioArray.slice(
            primoScrutinioArray.length / 2,
            primoScrutinioArray.length
          );

          primoScrutinioArray.splice(
            primoScrutinioArray.length / 2,
            primoScrutinioArray.length
          );
        }

        //memorizzo i dati del/degli scrutini/o
        setDatiPrimoScrutinio(primoScrutinioArray);
        setDatiSecondoScrutinio(secondoScrutinioArray);

        //memorizzo i dati per i grafici
        //primo scrutinio
        let datasPrimo = primoScrutinioArray.map((item) => item);
        datasPrimo.splice(
          datasPrimo.findIndex(
            (item) => item.Materia === "Religione Cattolica"
          ),
          1
        );
        datasPrimo.splice(
          datasPrimo.findIndex((item) => item.Materia === "Comportamento"),
          1
        );
        setDatiGrafPrimoScrutinio(datasPrimo);

        //secondo scrutinio
        let datasSecondo = secondoScrutinioArray.map((item) => item);
        datasSecondo.splice(
          datasSecondo.findIndex(
            (item) => item.Materia === "Religione Cattolica"
          ),
          1
        );
        datasSecondo.splice(
          datasSecondo.findIndex((item) => item.Materia === "Comportamento"),
          1
        );
        setDatiGrafSecondoScrutinio(datasSecondo);
      });
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.checked;
    setChecked(value);
  };

  //crea i dati per le tabelle
  const createData = (materia, voto, assenze) => {
    return { materia, voto, assenze };
  };

  const colonne = ["materia", "voto", "assenze"];

  const tabellaPrimoScrutinio = () => {
    console.log(datiGrafPrimoScrutinio);
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
            {datiPrimoScrutinio.map((row, index) => (
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
  const graficoPrimoScrutinio = () => {
    return (
      <RadarChart
        outerRadius={180}
        width={tableWidth}
        height={750}
        data={datiGrafPrimoScrutinio}
        sx={{}}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="materia" stroke="white" />
        <PolarRadiusAxis angle={54} domain={[0, 10]} display="none" />
        <Radar
          name="Alunno"
          dataKey="voto"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    );
  };

  const tabellaSecondoScrutinio = () => {
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
            {datiSecondoScrutinio.map((row, index) => (
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
  const graficoSecondoScrutinio = () => {
    return (
      <RadarChart
        outerRadius={180}
        width={tableWidth}
        height={750}
        data={datiGrafSecondoScrutinio}
        sx={{}}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="materia" stroke="white" />
        <PolarRadiusAxis angle={54} domain={[0, 10]} display="none" />
        <Radar
          name="Alunno"
          dataKey="voto"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    );
  };

  const pagination = () => {
    const elements = checkConditionalRendering();
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ width: "40%" }}>{tabellaPrimoScrutinio()}</Box>
          <Box sx={{ width: "40%" }}>{elements[0]}</Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Box sx={{ width: "40%" }}>{elements[1]}</Box>
          <Box sx={{ width: "40%" }}>{graficoSecondoScrutinio()}</Box>
        </Box>
      </Box>
    );
  };

  const checkConditionalRendering = () => {
    let elements = [<></>, <></>];
    if (checked) {
      elements[0] = tabellaSecondoScrutinio();
      elements[1] = graficoPrimoScrutinio();
    } else {
      elements[0] = graficoPrimoScrutinio();
      elements[1] = tabellaSecondoScrutinio();
    }
    return elements;
  };

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
        <Box>
          <Typography variant="h4">Scrutini</Typography>
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
        </Box>
        {pagination()}
      </Box>
    </Box>
  );
}
