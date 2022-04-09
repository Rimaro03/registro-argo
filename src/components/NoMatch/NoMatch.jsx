import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { Box } from "@mui/material";
import { CssBaseline } from "@mui/material";

export default function NoMatch() {
    const [cookies, setCookie] = useCookies();

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login"
        }
    }, [])
    return (
        <Box sx={{ display: 'flex' }}>
            <h1>404 PAGE NOT FOUND</h1>
        </Box>
    );
}