// REACT IMPORTS
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

// UI COMPONTENT (SHADCN)
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

export const AddPatients = () => {
  
  const [date, setDate] = React.useState<Date>();

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
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Seleccione Fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          </div>
        </form>
      </div>
    </div>
  );
};
