import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import getScrutinio from "../../../api/getScrutinio";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
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

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Materia",
      headerName: "Materia",
      width: 150,
      editable: false,
    },
    {
      field: "Voto",
      headerName: "Voto",
      width: 150,
      editable: false,
    },
  ];

  useEffect(() => {
    if (!cookies.token) {
      window.location.href = "/login";
    }

    getScrutinio(cookies.token).then((scrutinioArray) => {
      setScrutinio(scrutinioArray);
      let datas = scrutinioArray.map(item => item)
      datas.splice(datas.findIndex(item => item.Materia === "Religione Cattolica"), 1)
      setChartData(datas)
    });

    checkScrutini(cookies.token).then((scrutiniObj) => {
      setScrutini(scrutiniObj);
    });
  }, []);

  const loadPrimoScrutinio = () => {
    if (scrutini.primo) {
      return (
        <>
          <Typography variant="h4">Primo scrutinio</Typography>
          <div style={{ height: 682, width: tableWidth }}>
            <DataGrid rows={scrutinio} columns={columns} hideFooter={true} disableColumnMenu={true}/>
          </div>
        </>
      );
    }
  };

  const loadSecondoScrutinio = () => {
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
  };

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
        {loadSecondoScrutinio()}
      </Box>
        <RadarChart outerRadius={150} width={tableWidth} height={700} data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="Materia" />
          <PolarRadiusAxis angle={30} domain={[0, 10]}/>
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
