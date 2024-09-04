import {  useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TableComponent } from "@/components/TableComponent/TableComponent";

export const CurrentPatients = () =>{

    const navigateTo = useNavigate();

    return(
        <div className="w-[100%]">
            <div className="pageInfo">
                <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-solid fa-bed mx-2"/> Pacientes Actuales</h1>
                <hr className="mt-3" />
            </div>
        <div className="buttonContainer flex justify-end align-middle items-center">
          <Button className="bg-blue-900 w-[180px] h-[40px] mt-5" onClick={() => navigateTo('/pacientes_actuales/añadir')}>
            <span className="mx-2"><i className="fa-solid fa-circle-plus"/> Agregar Pacientes</span>
          </Button>
        </div>
        <div className="tableContainer mt-5">
        <TableComponent/>
        </div>
      </div>
    )
}