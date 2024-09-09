// REACT IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input";


// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { CPatientsColums, dataCPatients, ICPatients } from "./CurrentPatients.data";

export const CurrentPatients = () =>{

  const [columns, setColumns]  = useState(CPatientsColums);

  const getDataTable = (icon: string, data: ICPatients) =>{
    console.log(icon);
    console.log(data);
  }
  
  const navigateTo = useNavigate();

    return(
        <div className="w-[100%]">
            <div className="pageInfo">
                <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-solid fa-bed mx-2"/> Pacientes Actuales</h1>
                <Separator className="mt-3" />
            </div>
        <div className="buttonContainer flex justify-end align-middle items-center mt-5">
            <Input className="w-[30%] mx-5" placeholder="Buscar Paciente..."/>
            <Button className="bg-blue-900 hover:bg-blue-950 w-[180px] h-[40px]" onClick={() => navigateTo('/pacientes_actuales/añadir')}>
            <span className="mx-2"><i className="fa-solid fa-circle-plus"/> Agregar Pacientes</span>
          </Button>
        </div>
        <div className="mt-5">
        <TableComponent columns={columns} dataTable={dataCPatients} returndata={getDataTable}/>
        </div>
      </div>
    )
}