import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";
import { red } from '@mui/material/colors';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import apiRequest from "../../../api/apiRequest";

export default function Note() {
    const [cookies] = useCookies();
    const [note, setNote] = useState([]);

    useEffect(() => {
        if (!cookies.session) {
            window.location.href = "/login"
        }

        apiRequest("notedisciplinari").then((res)=>{
            setNote(res.dati);
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
                    Note disciplinari
                </Typography>
                <List>
                    {note.map((item, index) => {
                        const docente = item.docente.replace("(", "").replace(")", "").replace("Prof. ", "")

                        return (
                            <ListItem key={index} sx={{ border: "1px solid #ccc", borderRadius: "5px", margin: 1 }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: red[500] }}>
                                        <PriorityHighIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline', fontWeight: 600 }}
                                                component="span"
                                            >
                                                {docente}
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
                                                {item.desNota}
                                            </Typography>
                                            <br />
                                            {item.datNota}
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