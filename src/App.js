import React from 'react';
import Login from './components/Login/Login';
import Riepilogo from './components/subpages/Riepilogo/Riepilogo';
import Voti from './components/subpages/Voti/Voti';
import Assenze from './components/subpages/Assenze/Assenze';
import Note from './components/subpages/Note/Note';
import Scrutinio from './components/subpages/Scrutinio/Scrutinio';
import Compiti from './components/subpages/Compiti/Compiti';
import Argomenti from './components/subpages/Argomenti/Argomenti';
import Promemoria from './components/subpages/Promemoria/Promemoria';
import NoMatch from './components/NoMatch/NoMatch';
import { Routes, Route } from "react-router-dom";
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

function App() {
  const mode = 'dark';
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/riepilogo" element={<Riepilogo />} />
        <Route path="/voti" element={<Voti />} />
        <Route path="/assenze" element={<Assenze />} />
        <Route path="/note" element={<Note />} />
        <Route path="/scrutinio" element={<Scrutinio />} />
        <Route path="/compiti" element={<Compiti />} />
        <Route path="/argomenti" element={<Argomenti />} />
        <Route path="/promemoria" element={<Promemoria />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
