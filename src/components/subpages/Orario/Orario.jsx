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
  Toolbar,
  Switch,
  Typography,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { green } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import getOrario from "../../../api/getOrario";
import getAlunnoData from "../../../api/getAlunnoData";

export default function Orario() {
  const [cookies] = useCookies();
  const [orario, setOrario] = useState([]);

  useEffect(() => {
    if (!cookies.session) {
      window.location.href = "/login";
    }

    const data = JSON.parse(window.localStorage.getItem("schede"))
    const classe = `${data.desDenominazione}${data.desCorso}`;

    getOrario(classe).then((res) => {
      console.log(res);
    });
  }, []);

};