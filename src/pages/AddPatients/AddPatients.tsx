// REACT IMPORTS

// UI COMPONTENT (SHADCN)
import { PopoverCalendar } from "@/components/PopoverCalendar/PopoverCalendar";
import { Selector } from "@/components/Selector/Selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

// DATA COMPONENTS
import { CurrentPatientsStatusSelector } from "./AddPatients.data";

export const AddPatients = () => {
  const navigateTo = useNavigate();

  return (
    <div className="w-[100%]">
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-bed mx-2" /> Añadir Paciente
        </h1>
        <Separator className="mt-3" />
      </div>
      <div className="mt-5">
      <h1 className="text-2xl font-bold text-neutral-600">INFORMACIÓN DEL PACIENTE</h1>
      <form action="">
        <div className="w-[100%] flex justify-between items-center mt-5">
          <div>
            <Label htmlFor="userName">Nombre y Apellido del Paciente</Label>
            <Input
              className="w-[300px]"
              type="text"
              placeholder="Inserte Nombre....."
            />
          </div>
          <div>
            <Label htmlFor="userName">Tipo de Cirugía</Label>
            <Selector className="w-[300px]" />
          </div>
          <div>
            <Label className="" htmlFor="userName">
              Fecha de Ingreso
            </Label>
            <PopoverCalendar />
          </div>
        </div>
        <div className="mt-3 flex justify-between items-end">
          <div>
            <Label htmlFor="userName">Estado del Paciente</Label>
            <Selector select={CurrentPatientsStatusSelector} className="w-[300px]" />
          </div>
          <div className="buttonsContainer flex">
            <div className="cancelButton mx-5">
              <Button
                onClick={() => navigateTo("/pacientes_actuales")}
                className="bg-red-700 hover:bg-red-800 flex justify-center"
              >
                <i className="fa-solid fa-xmark mx-1" />
                Cancelar
              </Button>
            </div>
            <div className="saveButton">
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-950 flex justify-center"
              >
                <i className="fa-solid fa-floppy-disk mx-1" />
                Guardar
              </Button>
            </div>
          </div>
        </div>
        <div className="buttonsContainer w-full flex justify-start items-center mt-5"></div>
      </form>
      </div>
    </div>
  );
};
