// REACT IMPORTS
import { useNavigate } from "react-router-dom";


// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Selector } from "@/components/Selector/Selector";
import { useState } from "react";

// DATA COMPONENTS
import { IUsersRoles, UserRolesSelector } from "./AddUsers.data";

export const AddUsers = () => {

  const [roles, setRoles] = useState(UserRolesSelector)

  const navigateTo = useNavigate();
  return (
    <div className="w-[100%]">
      <div>
        <div className="pageInfo">
          <h1 className="text-2xl font-bold text-neutral-600">
            <i className="fa-solid fa-user-plus" /> Añadir Usuario
          </h1>
          <Separator className="mt-3" />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-neutral-600">INFORMACIÓN DE USUARIO</h1>
        <form action="">
          <div className="formContainer w-[100%] flex justify-between items-center mt-5">
            <div>
              <Label className="" htmlFor="userName">Nombre de Usuario</Label>
              <Input className="w-[300px]" type="text"/>
            </div>
            <div>
              <Label className="" htmlFor="password">Contraseña</Label>
              <Input className="w-[300px]" type="text"/>
            </div>
            <div>
              <Label className="" htmlFor="userName">Rol de Usuario</Label>
              <Selector select={roles}/>
            </div>
          </div>

          <div className="buttonsContainer w-full flex justify-start items-center mt-5">
          <div className="cancelButton">
            <Button onClick={() => navigateTo('/usuarios')} className="bg-red-700 hover:bg-red-800 flex justify-center">
              <i className="fa-solid fa-xmark mx-1"/>Cancelar
              </Button>
            </div>
            <div className="saveButton">
            <Button type="submit" className="bg-blue-900 hover:bg-blue-950 flex justify-center mx-5">
              <i className="fa-solid fa-floppy-disk mx-1"/>Guardar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
