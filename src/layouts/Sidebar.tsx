import { Link, Outlet, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

import ssmrlogo from "../assets/ssmr-3.png";
import "./Sidebar.css";

export const Sidebar = () => {
  
  const navigateTo = useNavigate();

  return (
    <div className="flex justify-between items-start w-screen h-screen overflow-hidden">
      <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4">
        <div className="opRoom-Container">
          <img className="ssmrlogo1 h-[50px] mx-2" src={ssmrlogo} />
          <h1 className="font-bold text-[1.5rem] text-neutral-600 mx-2">
            QUIRÓFANO
          </h1>
        </div>
        <div className="comandList-Container grow">
          <Command>
            <CommandList>
              {/* <Button
                className="bg-blue-900 hover:bg-blue-950 w-[100%] h-[45px] mt-3 mb-3"
                onClick={() => navigateTo("/pacientes_actuales/añadir")}
              >
                <span className="text-lg">Añadir Pacientes</span>
              </Button> */}
              <CommandGroup heading="Pacientes">
                <Link to={"/pacientes_actuales"}>
                  <CommandItem className="cursor-pointer p-2">
                  <i className="fa-solid fa-bed mx-2"/>
                    <span>Pacientes Actuales</span>
                  </CommandItem>
                </Link>
                <Link to={"/pacientes_previos"}>
                  <CommandItem className="cursor-pointer p-2">
                  <i className="fa-solid fa-hospital-user mx-2"/>
                    <span>Pacientes Previos</span>
                  </CommandItem>
                </Link>
                <Link to={"/intervenciones"}>
                  <CommandItem className="cursor-pointer p-2">
                  <i className="fa-brands fa-medrt mx-2"></i>
                    <span>Lista de Intervenciones</span>
                  </CommandItem>
                </Link>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Opciones">
                <Link to={"/usuarios"}>
                  <CommandItem className="cursor-pointer p-2">
                  <i className="fa-solid fa-users mx-2"/>
                    <span>Usuarios</span>
                  </CommandItem>
                </Link>
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="LogoutButton">
          <Button className=" w-[100%] h-[45px] bg-red-600 hover:bg-red-700">
            <span className="text-lg"><i className="fa-solid fa-arrow-right-from-bracket"/> Cerrar Sesión</span>
          </Button>
        </div>
      </div>
      <div className="p-8 w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};
