import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import apiRequest from "../../../api/apiRequest";

export default function Riepilogo() {
  const [cookies, setCookie] = useCookies();
  const [tipi, setTipi] = useState([]);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    let month = new Date().getMonth() + 1
    if (month < 10) {
      month = `0${month}`;
    }
    const current = `${new Date().getFullYear()}-${month}-${new Date().getDate() - 1}`
    let compitiList = []
    apiRequest(`oggi?datGiorno=${current}`).then((res) => {
      res.dati.forEach((dato) => {
        //if(!tipi.find(value => value == dato.titolo)){
        setTipi(...tipi, dato)
        //}
      })
    })
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
        <Typography>IN COSTRUZIONE</Typography>
        {console.log(tipi)}
      </Box>
    </Box>
  );
}
