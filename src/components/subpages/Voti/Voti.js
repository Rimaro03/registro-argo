import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import getVoti from "../../../api/getVoti";
import { red, green } from '@mui/material/colors';

export default function Voti() {
    const [cookies, setCookie] = useCookies();
    const [voti, setVoti] = useState([]);

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login"
        }

        getVoti(cookies.token)
            .then(votiArray => {
                setVoti(votiArray);
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
                    Voti
                </Typography>
                <List>
                    {voti.map((item, index) => {
                        let voto = item.codVoto;
                        if (voto.includes("10")) {
                            voto = Number(item.codVoto.slice(0, 2))
                        }
                        else {
                            voto = Number(item.codVoto.slice(0, 1))
                        }

                        let avatarColor = "";
                        voto < 6 ? avatarColor = red[500] : avatarColor = green[500];

                        return (
                            <ListItem key={index} sx={{ border: "1px solid #ccc", borderRadius: "5px", margin: 1 }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: avatarColor }}>{voto}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline', fontWeight: 600 }}
                                                component="span"
                                            >
                                                {item.desMateria}
                                            </Typography>
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
                                                {item.desProva}
                                            </Typography>
                                            <br />
                                            {item.docente}
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