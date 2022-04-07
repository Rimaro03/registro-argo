import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import getAssenze from "../../../api/getAssenze";
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { red, green } from '@mui/material/colors';

export default function Assenze() {
    const [cookies, setCookies] = useCookies();
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
                    Assenze
                </Typography>
                <List>
                    {assenze.map((item, index) => {
                        return (
                            <ListItem key={index} sx={{ border: "1px solid #ccc", borderRadius: "5px", margin: 1 }}>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline', fontWeight: 600 }}
                                                component="span"
                                            >
                                                Assenza del {item.datAssenza}
                                            </Typography>
                                        </React.Fragment>
                                    }
                                    secondary={
                                        <React.Fragment>
                                            {item.registrataDa}
                                            <br />
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"

                                            >
                                            </Typography>
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