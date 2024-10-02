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
import { deleteDataApi, getDataApi, putDataApi } from "@/backend/baseAxios";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BaseResponse } from "@/interfaces/base-response.interface";
import { DeleteDialog } from "@/components/DeleteDialog/DeleteDialog";
// import { useNavigate } from "react-router-dom";
import { DialogUpdatePatient } from "@/components/DialogUpdatePatient/DialogUpdatePatient";
import { IUpdatePatient } from "@/components/DialogUpdatePatient/DialogUpdatePatient.data";


export const PreviousPatients = () => {
  // const navigateTo = useNavigate();
  const [dataPrevousPatients, setDataPrevousPatient] = useState<IPatient[]>([]);
  const [baseDataPrevousPatients, setBaseDataPrevousPatient] = useState<IPatient[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<IPatient>();
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const { toast } = useToast();
  
  const getPrevousPatientApi = async () => {
    setLoader(true);
    await getDataApi(`/patients/prev`).then((response: IPatient[]) => {
      if (response) {
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
    if (icon == 'Borrar') {
      setDataSelected(data);
      setOpenDialog(true);
    }
    if (icon == 'Editar') {
      setDataSelected(data);
      setOpenDialogUpdate(true);
    }
  };

  const closeDialog = (borrar: boolean) => {
    if (borrar) {
      deleteData();
    }
    setOpenDialog(false);
  }

  const updatePatient = (date: IUpdatePatient | null) => {
    if (date) {
      updatePatientData(date);
    }
    setOpenDialogUpdate(false);
  }

  const updatePatientData = async (data: IUpdatePatient) => {
    if (dataSelected) {
      await putDataApi('/patients/current', dataSelected.patients_id as number, data).then((response: BaseResponse) => {
        showToast(response);
        getPrevousPatientApi();
      })
    }
  }

  const deleteData = async () => {
    if (dataSelected) {
      await deleteDataApi('/patients', dataSelected.patients_id as number).then((response: BaseResponse) => {
        showToast(response);
        getPrevousPatientApi();
      })
    }
  }


  const showToast = (baseResponse: BaseResponse) => {
    toast({
      variant: baseResponse.success ? 'default' : "destructive",
      description: baseResponse.message,
      className: `!left-0 !right-0 !mx-auto !w-full ${baseResponse.success && 'bg-blue-900 text-white'} font-bold text-center`,
      duration: 1500
    })
  }

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

        <DeleteDialog open={openDialog} close={closeDialog} text={'¿Estas seguro de que quieres eliminar este paciente?'} />
        {dataSelected && (
          <DialogUpdatePatient open={openDialogUpdate} close={updatePatient} value={dataSelected.patients_updated_date} text={'Ingrese la fecha de Egreso'} />
        )}
        
        {loader ? <Loader /> : (
          dataPrevousPatients && dataPrevousPatients.length > 0 ?
            <TableComponent columns={PrevousPatientsColums} dataTable={dataPrevousPatients} returnData={getDataTable} />
            :
            <p className="text-center">No se encontraron datos.</p>
        )}
      </div>
    </div>
  );
};
