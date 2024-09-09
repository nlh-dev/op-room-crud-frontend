// REACT IMPORTS
import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom';

// PAGES
import { Sidebar } from './layouts/Sidebar'
import { CurrentPatients } from './pages/CurrentPatients/CurrentPatients';
import { AddPatients } from './pages/AddPatients/AddPatients';
import { PreviousPatients } from './pages/PrevousPatients/PrevousPatients';
import { Specialities } from './pages/Specialities/Specialities';
import { Users } from './pages/Users/Users';
import { AddUsers } from './pages/AddUsers/AddUsers';

// CSS IMPORTS
import './App.css'



export default function App() {
  return (
    <Browser>
    <Routes>
      <Route path='/' element={<Sidebar/>}>
        <Route path='/pacientes_actuales' element={<CurrentPatients/>} />
        <Route path='/pacientes_actuales/añadir' element={<AddPatients/>}/>
        <Route path='/pacientes_previos' element={<PreviousPatients/>} />
        <Route path='/intervenciones' element={<Specialities/>}/>
        <Route path='/usuarios' element={<Users/>} />
        <Route path='/usuarios/añadir' element={<AddUsers/>} />
      </Route>
    </Routes>
    </Browser>
  );
}
