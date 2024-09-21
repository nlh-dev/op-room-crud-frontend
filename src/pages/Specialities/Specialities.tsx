// REACT IMPORTS

// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

// DATA COMPONENTS
import { TableComponent } from "@/components/TableComponent/TableComponent"
import { SpecialitiesColumns, ISpecialities, dataSpecialities } from "./Specialities.data"

export const Specialities =() => {


  const getDataTable = (icon: string, data: ISpecialities) =>{
    console.log(icon);
    console.log(data);
  }
  return (
    <div className="w-[100%]">
    <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-brands fa-medrt mx-2"/> Lista de Intervenciones</h1>
        <Separator className="mt-3" />
    </div>
        <div className="flex justify-end align-middle items-center mt-5">
          <h1 className="font-bold">Añadir Especialidad</h1>
          <Input className="w-[30%] mx-5" placeholder="Inserte Especialidad..."/>
          <Button className="bg-blue-900 hover:bg-blue-950 w-[100px] h-[40px]">
            <span className="mx-2"><i className="fa-solid fa-circle-plus"/> Agregar</span>
          </Button>
        </div>
        <div className="mt-5">
          <TableComponent columns={SpecialitiesColumns} dataTable={dataSpecialities} returndata={getDataTable}/>
        </div>
    </div>
  )
}

