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
import { deleteDataApi, getDataApi, putDataApi } from "@/backend/baseAxios";
import { IPatient } from "@/interfaces/patients.interface";
import { Loader } from "@/components/loader/Loader";
import { DeleteDialog } from "@/components/DeleteDialog/DeleteDialog";
import { useToast } from "@/hooks/use-toast";
import { BaseResponse, IUserData } from "@/interfaces/base-response.interface";
import { DialogUpdatePatient } from "@/components/DialogUpdatePatient/DialogUpdatePatient";
import { IUpdatePatient } from "@/components/DialogUpdatePatient/DialogUpdatePatient.data";
import { userToken } from "@/backend/authenticate";
import { IColumns } from "@/components/TableComponent/TableComponent.data";

export const CurrentPatients = () => {
  const navigateTo = useNavigate();
  const [columuns, setColumns] = useState<IColumns<IPatient>[]>(CPatientsColums);

  const [dataCurrentPatients, setDataCurrentPatient] = useState<IPatient[]>([]);
  const [baseDataCurrentPatients, setBaseDataCurrentPatient] = useState<IPatient[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openDialogUpdate, setOpenDialogUpdate] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<IPatient>();
  const { toast } = useToast();
  const userData: IUserData = userToken();

  const changeColumns = () => {
    const copyColumns = CPatientsColums.filter(col => col.header !== 'Opciones');
    setColumns(copyColumns);
  }

  useEffect(() => {
    if (userData.roles.roles_name == 'Usuario Estándar') {
      changeColumns()
    }
  }, [])

  const getCurrentPatientApi = async () => {
    setLoader(true);
    await getDataApi(`/patients/current`).then((response: IPatient[]) => {
      if (response) {
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
    if (icon == 'Borrar') {
      setDataSelected(data);
      setOpenDialog(true);
    }
    if (icon == 'Editar') {
      localStorage.setItem('patientEdit', JSON.stringify(data));
      navigateTo('editar')
    }
    if (icon == 'Liberar') {
      setOpenDialogUpdate(true);
      setDataSelected(data);
    }
  }

  const updatePatient = (date: IUpdatePatient | null) => {
    if (date) {
      updatePatientData(date);
    }
    setOpenDialogUpdate(false);
  }

  const closeDialog = (borrar: boolean) => {
    if (borrar) {
      deleteData();
    }
    setOpenDialog(false);
  }

  const updatePatientData = async (data: IUpdatePatient) => {
    if (dataSelected) {
      await putDataApi('/patients/current', dataSelected.patients_id as number, data).then((response: BaseResponse) => {
        showToast(response);
        getCurrentPatientApi();
      })
    }
  }

  const deleteData = async () => {
    if (dataSelected) {
      await deleteDataApi('/patients', dataSelected.patients_id as number).then((response: BaseResponse) => {
        showToast(response);
        getCurrentPatientApi();
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
    <div className="w-[100%]">
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-solid fa-bed mx-2" /> Pacientes Actuales</h1>
        <Separator className="mt-3" />
      </div>
      <div className="buttonContainer flex justify-end align-middle items-center mt-5">
        <Input className="w-[30%] mx-5" onChange={(e) => filterData(e.target.value)} placeholder="Buscar Paciente..." />

        {userData.roles.roles_name !== 'Usuario Estándar' && (
          <Button className="bg-blue-900 hover:bg-blue-950 w-[180px] h-[40px]" onClick={() => navigateTo('/pacientes_actuales/añadir')}>
            <span className="mx-2"><i className="fa-solid fa-circle-plus" /> Agregar Pacientes</span>
          </Button>
        )}
      </div>

      <DeleteDialog open={openDialog} close={closeDialog} text={'¿Desea eliminar este paciente?'} />
      <DialogUpdatePatient open={openDialogUpdate} close={updatePatient} text={'Ingrese la fecha de Egreso'} />

      <div className="mt-5">
        {loader ? <Loader /> : (
          dataCurrentPatients && dataCurrentPatients.length > 0 ?
            <TableComponent columns={columuns} dataTable={dataCurrentPatients} returnData={getDataTable} />
            :
            <p className="text-center">No se encontraron datos.</p>
        )}
      </div>
    </div>
  )
}