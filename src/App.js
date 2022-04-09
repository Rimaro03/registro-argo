import Login from './components/Login/Login';
import Riepilogo from './components/subpages/Riepilogo/Riepilogo';
import Voti from './components/subpages/Voti/Voti';
import Assenze from './components/subpages/Assenze/Assenze';
import Note from './components/subpages/Note/Note';
import Scrutinio from './components/subpages/Scrutinio/Scrutinio';
import Compiti from './components/subpages/Compiti/Compiti';
import NoMatch from './components/NoMatch/NoMatch';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/riepilogo" element={ <Riepilogo /> } />
        <Route path="/voti" element={ <Voti /> } />
        <Route path="/assenze" element={ <Assenze /> } />
        <Route path="/note" element={ <Note /> } />
        <Route path="/scrutinio" element={ <Scrutinio /> } />
        <Route path="/compiti" element={ <Compiti /> } />
        <Route path="*" element={ <NoMatch /> }/>
      </Routes>
    </>
  );
}

export default App;
