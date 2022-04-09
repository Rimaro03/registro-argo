import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import getScrutinio from "../../../api/getScrutinio";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useCookies } from "react-cookie";
import { Box, Typography } from "@mui/material";
import checkScrutini from "../../../api/checkScrutini";

export default function Scrutinio() {
  const [cookies] = useCookies();
  const [scrutinio, setScrutinio] = useState([]);
  const [scrutini, setScrutini] = useState({});

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
    });

    checkScrutini(cookies.token).then((scrutiniObj) => {
      console.log(scrutiniObj);
      setScrutini(scrutiniObj);
    });
  }, []);

  const loadPrimoScrutinio = () => {
    if (scrutini.primo) {
      return (
        <>
          <Typography variant="h4">Primo scrutinio</Typography>
          <div style={{ height: 685, width: "100%" }}>
            <DataGrid rows={scrutinio} columns={columns} hideFooter={true} />
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
          <div style={{ height: 685, width: "100%" }}>
            <DataGrid rows={scrutinio} columns={columns} hideFooter={true} />
          </div>
        </>
      );
    }
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
          mt: 10,
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          {loadPrimoScrutinio()}
          {loadSecondoScrutinio()}
        </Box>
      </Box>
    </Box>
  );
}
