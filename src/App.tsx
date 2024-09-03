import { BrowserRouter as Browser, Routes, Route } from 'react-router-dom';
import { CurrentPatients } from './pages/CurrentPatients/CurrentPatients';
import { PreviousPatients } from './pages/PrevousPatients/PrevousPatients';
import { HomePage } from './pages/HomePage/HomePage';
import { AddPatients } from './pages/AddPatients/AddPatients';
import { Profile } from './pages/Profile/Profile';
import { Users } from './pages/Users/Users';
import { Sidebar } from './layouts/Sidebar'
import './App.css'


export default function App() {
  return (
    <Browser>
    <Routes>
      <Route path='/' element={<Sidebar/>}>
        <Route path='/inicio' element={<HomePage/>} />
        <Route path='/pacientes_actuales' element={<CurrentPatients/>} />
        <Route path='/pacientes_actuales/añadir' element={<AddPatients/>}/>
        <Route path='/pacientes_previos' element={<PreviousPatients/>} />
        <Route path='/perfil' element={<Profile/>} />
        <Route path='/usuarios' element={<Users/>} />
      </Route>
    </Routes>
    </Browser>
  );
}
