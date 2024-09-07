import {
  PrevousPatientsColums,
  dataPrevousPatients,
  IPreviousPatients,
} from "./PrevousPatients.data";

import { TableComponent } from "@/components/TableComponent/TableComponent";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

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
        <TableComponent columns={columns} dataTable={dataPrevousPatients} returndata={getDataTable} />
      </div>
    </div>
  );
};
