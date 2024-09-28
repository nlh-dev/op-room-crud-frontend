// REACT IMPORTS

// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent"
import { SpecialitiesColumns } from "./Specialities.data"
import { deleteDataApi, getDataApi } from "@/backend/baseAxios"
import { useState, useEffect } from "react"
import { ISpecialites } from "@/interfaces/specialities.interface"
import { Loader } from "@/components/loader/Loader"
import { DeleteDialog } from "@/components/DeleteDialog/DeleteDialog"
import { BaseResponse } from "@/interfaces/base-response.interface"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"

export const Specialities = () => {
  const [dataSpecialities, setDataSpecialities] = useState<ISpecialites[]>([]);
  const [dataSelected, setDataSelected] = useState<ISpecialites>();
  const [baseDataSpecialities, setBaseDataSpecialities] = useState<ISpecialites[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { toast } = useToast();
  const navigateTo = useNavigate();

  const getSpecialitiesApi = async () => {
    setLoader(true);
    await getDataApi(`/specialities`).then((response: ISpecialites[]) => {
      if (response.length > 0) {
        setDataSpecialities(response);
        setBaseDataSpecialities(response);
        setLoader(false);
      }
    })
  }

  const filterData = (filter: string): void => {
    const findData = baseDataSpecialities.filter(find => find.surgery_type_name.toLowerCase().includes(filter.toLowerCase()));
    setDataSpecialities(findData);
  }

  useEffect(() => {
    getSpecialitiesApi();
  }, [])

  const getDataTable = (icon: string, data: ISpecialites) => {
    setDataSelected(data);
    setOpenDialog(true);
  }

  const closeDialog = (borrar: boolean) => {
    if (borrar) {
      deleteData();
    }

    setOpenDialog(false);
  }

  const deleteData = async () => {
    if (dataSelected) {
      await deleteDataApi('/specialities', dataSelected.surgery_type_id as number).then((response: BaseResponse) => {
        showToast(response);
        getSpecialitiesApi();
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
        <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-brands fa-medrt mx-2" /> Lista de Intervenciones</h1>
        <Separator className="mt-3" />
      </div>
      <div className="flex justify-end align-middle items-center mt-5">
        <h1 className="font-bold">Añadir Especialidad</h1>
        <Input className="w-[30%] mx-5" onChange={(e) => filterData(e.target.value)} placeholder="Inserte Especialidad..." />
        <Button onClick={() => navigateTo('añadir')} className="bg-blue-900 hover:bg-blue-950 w-[100px] h-[40px]">
          <span className="mx-2">
            <i className="fa-solid fa-circle-plus" /> Agregar
          </span>
        </Button>
      </div>

      <DeleteDialog open={openDialog} close={closeDialog} text={'¿Estas seguro de que quieres eliminar este servicio?'} />

      <div className="mt-5">
        {loader ? (
          <Loader />
        ) : (
          dataSpecialities && dataSpecialities.length > 0 ? (

            <TableComponent columns={SpecialitiesColumns} dataTable={dataSpecialities} returnData={getDataTable} />
          ) : (
            <p className="text-center">No se encontraron datos.</p>
          )

        )}
      </div>
    </div>
  )
}

