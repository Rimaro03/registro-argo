import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography } from "@mui/material";

export default function Riepilogo() {
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login"
        }
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
                <Typography>
                    IN COSTRUZIONE
                </Typography>
            </Box>
        </Box>
    );
}