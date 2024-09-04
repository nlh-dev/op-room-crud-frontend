import { Button } from "@/components/ui/button"

export const Specialities =() => {
  return (
    <div className="w-[100%]">
    <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600"><i className="fa-brands fa-medrt mx-2"/> Lista de Intervenciones</h1>
        <hr className="mt-3" />
    </div>
    <div className="buttonContainer flex justify-end align-middle items-center">
          <Button className="bg-blue-900 w-[200px] h-[40px] mt-5">
            <span className="mx-2"><i className="fa-solid fa-circle-plus"/> Agregar Intervención</span>
          </Button>
        </div>
    </div>
  )
}

