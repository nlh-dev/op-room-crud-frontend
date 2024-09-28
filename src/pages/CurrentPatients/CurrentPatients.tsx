// REACT IMPORTS
import { useNavigate } from "react-router-dom";

// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input";

// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { CPatientsColums } from "./CurrentPatients.data";
import { useEffect, useState } from "react";
import { getDataApi } from "@/backend/baseAxios";
import { IPatient } from "@/interfaces/patients.interface";
import { Loader } from "@/components/loader/Loader";

export const CurrentPatients = () => {
  const navigateTo = useNavigate();
  const [dataCurrentPatients, setDataCurrentPatient] = useState<IPatient[]>([]);
  const [baseDataCurrentPatients, setBaseDataCurrentPatient] = useState<IPatient[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const getCurrentPatientApi = async () => {
    setLoader(true);
    await getDataApi(`/patients/current`).then((response: IPatient[]) => {
      if (response.length > 0) {
        setDataCurrentPatient(response);
        setBaseDataCurrentPatient(response);
      }
      setLoader(false);
    })
  }

  const filterData = (filter: string): void => {
    const findData = baseDataCurrentPatients.filter(find =>
      find.patients_name.toLowerCase().includes(filter.toLowerCase()) ||
      find.surgery_type.surgery_type_name.toLowerCase().includes(filter.toLowerCase())
    );
    setDataCurrentPatient(findData);
  }

  useEffect(() => {
    getCurrentPatientApi();
  }, [])

  const getDataTable = (icon: string, data: IPatient) => {
    console.log(icon);
    console.log(data);
  }

  return (
    <div className="w-[100%]">
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-solid fa-bed mx-2" /> Pacientes Actuales</h1>
        <Separator className="mt-3" />
      </div>
      <div className="buttonContainer flex justify-end align-middle items-center mt-5">
        <Input className="w-[30%] mx-5" onChange={(e) => filterData(e.target.value)} placeholder="Buscar Paciente..." />
        <Button className="bg-blue-900 hover:bg-blue-950 w-[180px] h-[40px]" onClick={() => navigateTo('/pacientes_actuales/añadir')}>
          <span className="mx-2"><i className="fa-solid fa-circle-plus" /> Agregar Pacientes</span>
        </Button>
      </div>
      <div className="mt-5">
        {loader ? <Loader /> : (
          dataCurrentPatients && dataCurrentPatients.length > 0 ?
            <TableComponent columns={CPatientsColums} dataTable={dataCurrentPatients} returnData={getDataTable} />
            :
            <p className="text-center">No se encontraron datos.</p>
        )}
      </div>
    </div>
  )
}