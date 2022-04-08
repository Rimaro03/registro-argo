import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import getScrutinio from '../../../api/getScrutinio';
import Header from "../../Header/Header";
import Menu from "../../Menu/Menu";
import { useCookies } from "react-cookie";
import { Box} from "@mui/material";

export default function Scrutinio() {
    const [cookies] = useCookies();
    const [scrutinio, setScrutinio] = useState([]);

    const columns = [
        {
            field: 'Materia',
            headerName: 'Materia',
            width: 150,
            editable: false,
        },
        {
            field: 'Voto',
            headerName: 'Voto',
            width: 150,
            editable: false,
        },
    ];

    useEffect(() => {
        if (!cookies.token) {
            window.location.href = "/login"
        }

        getScrutinio(cookies.token)
            .then(scrutinioArray => {
                setScrutinio(scrutinioArray);
            })
    }, [])

    let scrutinioGrezzo = [];
    scrutinio.forEach(item =>{
        scrutinioGrezzo.push({ Materia: item.desMateria, Voto: item.votoOrale.codVoto })
    })
    setScrutinio(scrutinioGrezzo)
    console.log(scrutinio);

    const drawerWidth = 300;

    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Menu />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth / 5}px` }}
            >
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={scrutinio}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </Box>
        </Box>
    );
}