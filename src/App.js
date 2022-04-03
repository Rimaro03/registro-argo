import Login from './components/Login/Login';
import Riepilogo from './components/subpages/Riepilogo/Riepilogo';
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/riepilogo" element={ <Riepilogo /> } />
      </Routes>
    </>
  );
}

export default App;
