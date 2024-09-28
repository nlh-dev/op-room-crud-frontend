// REACT IMPORTS

// UI COMPONENTS (SHADCN)
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { PrevousPatientsColums } from "./PrevousPatients.data";
import { IPatient } from "@/interfaces/patients.interface";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getDataApi } from "@/backend/baseAxios";
import { Loader } from "lucide-react";


export const PreviousPatients = () => {
  // const navigateTo = useNavigate();
  const [dataPrevousPatients, setDataPrevousPatient] = useState<IPatient[]>([]);
  const [baseDataPrevousPatients, setBaseDataPrevousPatient] = useState<IPatient[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const getPrevousPatientApi = async () => {
    setLoader(true);
    await getDataApi(`/patients/prev`).then((response: IPatient[]) => {
      if (response.length > 0) {
        setDataPrevousPatient(response);
        setBaseDataPrevousPatient(response);
      }
      setLoader(false);
    })
  }

  const filterData = (filter: string): void => {
    const findData = baseDataPrevousPatients.filter(find =>
      find.patients_name.toLowerCase().includes(filter.toLowerCase()) ||
      find.surgery_type.surgery_type_name.toLowerCase().includes(filter.toLowerCase())
    );
    setDataPrevousPatient(findData);
  }

  useEffect(() => {
    getPrevousPatientApi();
  }, [])

  const getDataTable = (icon: string, data: IPatient) => {
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
          <Input className="w-[30%]" onChange={(e) => filterData(e.target.value)} placeholder="Buscar Paciente..." />
        </div>
        {loader ? <Loader /> : (
          PrevousPatientsColums && PrevousPatientsColums.length > 0 ?
            <TableComponent columns={PrevousPatientsColums} dataTable={dataPrevousPatients} returnData={getDataTable} />
            :
            <p className="text-center">No se encontraron datos.</p>
        )}
      </div>
    </div>
  );
};
