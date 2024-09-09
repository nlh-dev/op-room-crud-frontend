// REACT IMPORTS
import { useState } from "react";

// UI COMPONENTS (SHADCN)
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { PrevousPatientsColums, dataPrevousPatients, IPreviousPatients } from "./PrevousPatients.data";


export const PreviousPatients = () => {
  const [columns, setColumns] = useState(PrevousPatientsColums);

  const getDataTable = (icon: string, data: IPreviousPatients) => {
    console.log(icon);
    console.log(data);
  };

  return (
    <div>
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-hospital-user mx-2" />
          Pacientes Previos
        </h1>
        <Separator className="mt-3" />
      </div>
      <div className="mt-5">
        <div className="inputContainer w-[100%] mb-5 flex justify-end">
        <Input className="w-[30%]" placeholder="Buscar Paciente..."/>
        </div>
        <TableComponent columns={columns} dataTable={dataPrevousPatients} returndata={getDataTable} />
      </div>
    </div>
  );
};
