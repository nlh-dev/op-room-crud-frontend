import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button"
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command"

import ssmrlogo from '../assets/ssmr-3.png'
import './Sidebar.css'


export const Sidebar = () => {
  return (

    <div className="flex justify-between items-start w-screen h-screen overflow-hidden">

      <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
        <div className="opRoom-Container">
          <img className='ssmrlogo1 h-[50px] mx-2' src={ssmrlogo} />
          <h1 className="font-bold text-[1.5rem] text-neutral-600 mx-2">QUIRÓFANO</h1>
        </div>
        <div className="comandList-Container grow">
          <Command>
            <CommandList>
              <Button className="bg-blue-900 w-[100%] h-[45px] mt-3 mb-3"><span className="text-lg">Añadir Pacientes</span></Button>
              <CommandGroup heading="General">
                <CommandItem><Link to={"/inicio"}><span>Inicio</span></Link></CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Pacientes">
                <CommandItem><Link to={"/pacientes_actuales"}><span>Pacientes Actuales</span></Link></CommandItem>
                <CommandItem><Link to={"/pacientes_previos"}><span>Pacientes Previos</span></Link></CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Opciones">
                <CommandItem><Link to={"/perfil"}><span>Perfil</span></Link></CommandItem>
                <CommandItem><Link to={"/usuarios"}><span>Usuarios</span></Link></CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="LogoutButton">
          <Button className=" w-[100%] h-[45px] bg-red-500"><span className="text-lg">Cerrar Sesión</span></Button>
        </div>
      </div>
        <div className="p-8 w-full">
          <Outlet></Outlet>
        </div>

    </div>
  );
}
