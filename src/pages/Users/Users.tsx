// REACT IMPORTS
import { useNavigate } from "react-router-dom";

// UI COMPONENTS (SHADCN)
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// DATA COMPONENTS
import { UserColumns } from "./Users.data";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { getDataApi } from "@/backend/baseAxios";
import { useEffect, useState } from "react";
import { IUserData } from "@/interfaces/base-response.interface";

export const Users = () => {
  const navigateTo = useNavigate();
  const [dataUsers, setDataUsers] = useState<IUserData[]>([]);

  const getUsersApi = async() => {
    await getDataApi(`/users`).then((response: IUserData[]) => {
      if(response.length > 0){
        setDataUsers(response);
      }
    })
  }

  useEffect(() => {
    getUsersApi();
  },[])

  return (
    <div>
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-users mx-2" />
          Usuarios
        </h1>
        <Separator className="mt-3" />
      </div>
      <div className="flex justify-end align-middle items-center mt-5">
      <Input className="w-[30%] mx-5" placeholder="Buscar Usuario..."/>
          <Button className="bg-blue-900 hover:bg-blue-950 w-[180px] h-[40px]" onClick={() => navigateTo("/usuarios/añadir")}>
            <span className="mx-2"><i className="fa-solid fa-circle-plus"/> Agregar Usuario</span>
          </Button>
        </div>

      <div className="mt-5">
        <TableComponent columns={UserColumns} dataTable={dataUsers}/>
      </div>
    </div>
  );
};
