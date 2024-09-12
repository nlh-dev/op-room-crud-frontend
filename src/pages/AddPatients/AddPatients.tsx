// REACT IMPORTS

// UI COMPONTENT (SHADCN)
import { PopoverCalendar } from "@/components/PopoverCalendar/PopoverCalendar";
import { Separator } from "@/components/ui/separator";

export const AddPatients = () => {

  return (
    <div className="w-[100%]">
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-bed mx-2" /> Pacientes Actuales
        </h1>
        <Separator className="mt-3" />
      </div>
      <div className="formContainer mt-5">
        <form action="">
          <div className="datePickerContainer">
            <h1 className="mb-2">Fecha de Ingreso</h1>
            <PopoverCalendar/>
          </div>
        </form>
      </div>
    </div>
  );
};
