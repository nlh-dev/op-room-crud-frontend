// REACT IMPORTS

// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent"
import { SpecialitiesColumns } from "./Specialities.data"
import { getDataApi } from "@/backend/baseAxios"
import { useState, useEffect } from "react"
import { ISpecialites } from "@/interfaces/specialities.interface"
import { Loader } from "@/components/loader/Loader"

export const Specialities = () => {
  const [dataSpecialities, setDataSpecialities] = useState<ISpecialites[]>([]);
  const [baseDataSpecialities, setBaseDataSpecialities] = useState<ISpecialites[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

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
    console.log(icon);
    console.log(data);
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
        <Button className="bg-blue-900 hover:bg-blue-950 w-[100px] h-[40px]">
          <span className="mx-2"><i className="fa-solid fa-circle-plus" /> Agregar</span>
        </Button>
      </div>

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

