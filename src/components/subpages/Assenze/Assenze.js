import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import getAssenze from "../../../api/getAssenze";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import DoneIcon from '@mui/icons-material/Done';
import { green } from '@mui/material/colors';

export default function Assenze() {
    const [cookies] = useCookies();
    const [assenze, setAssenze] = useState([]);

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login"
        }

        getAssenze(cookies.token)
            .then(assenzeArray => {
                setAssenze(assenzeArray);
            })
    }, [])

    const drawerWidth = 300;

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Menu />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth / 5}px` }}
            >
                <Toolbar />
                <Typography
                    variant="h4"
                >
                    Presenze
                </Typography>
                <List>
                    {assenze.map((item, index) => {
                        const docente = item.registrataDa.replace("(", "").replace(")", "").replace("Prof. ", "")
                        let evento = ""
                        switch (item.codEvento) {
                            case "A":
                                evento = `Assenza del ${item.datAssenza}`
                                break;
                            case "I":
                                evento = `Ingresso alle ${item.oraAssenza.split(" ")[1]}`
                                break;
                            case "U":
                                evento = `Uscita alle ${item.oraAssenza.split(" ")[1]}`
                                break;
                            default:
                                break;
                        }

                        let giustificata = "Da Giustificare!";
                        let icon = <WarningAmberIcon />
                        let color = "#ffcc00"
                        if (item.giustificataDa) {
                            giustificata = `Giustificata da ${item.giustificataDa.replace("(", "").replace(")", "").replace("Prof. ", "")}`;
                            icon = <DoneIcon />
                            color = green[500]
                        }
                        return (
                            <ListItem key={index} sx={{ border: "1px solid #ccc", borderRadius: "5px", margin: 1 }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: color }}>
                                        {icon}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline', fontWeight: 600 }}
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
                                                sx={{ display: 'inline' }}
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
        </Box>
    );
}