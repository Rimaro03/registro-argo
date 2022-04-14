import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import getScrutinio from "../../../api/getScrutinio";
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
} from "@mui/material";
import checkScrutini from "../../../api/checkScrutini";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function Scrutinio() {
  const [cookies] = useCookies();
  const [scrutinio, setScrutinio] = useState([]);
  const [scrutini, setScrutini] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getScrutinio(cookies.token).then((scrutinioArray) => {
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
    });

    checkScrutini(cookies.token).then((scrutiniObj) => {
      setScrutini(scrutiniObj);
    });
  }, []);

  const createData = (materia, voto, assenze) => {
    return { materia, voto, assenze };
  };

  let datiPrimoScrutinio = [];
  scrutinio.forEach((voto) => {
    datiPrimoScrutinio.push(createData(voto.Materia, voto.Voto, voto.Assenze));
  });
  console.log(scrutinio);

  const colonne = ["Materia", "Voto", "Assenze"];

  const loadPrimoScrutinio = () => {
    if (scrutini.primo) {
      return (
        <>
          <Typography variant="h4">Primo scrutinio</Typography>
          <TableContainer component={Paper} sx={{marginTop: 2}}>
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
        </>
      );
    }
  };

  /*const loadSecondoScrutinio = () => {
    if (scrutini.secondo) {
      return (
        <>
          <Typography variant="h4" sx={{ marginTop: 10 }}>
            Scrutinio Finale
          </Typography>
          <div style={{ height: 685 }}>
            <DataGrid rows={scrutinio} columns={columns} hideFooter={true} />
          </div>
        </>
      );
    }
  };*/

  const drawerWidth = 300;
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
      </Box>
      <RadarChart
        outerRadius={150}
        width={tableWidth}
        height={700}
        data={chartData}
      >
        <PolarGrid />
        <PolarAngleAxis dataKey="Materia" />
        <PolarRadiusAxis angle={30} domain={[0, 10]} />
        <Radar
          name="Alunno"
          dataKey="Voto"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
      </RadarChart>
    </Box>
  );
}
