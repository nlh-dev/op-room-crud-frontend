// REACT IMPORTS

// UI COMPONTENT (SHADCN)
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLocation, useNavigate } from "react-router-dom";

import { format } from "date-fns";
import { es } from "date-fns/locale";

// DATA COMPONENTS
import { ICreatePatient, initialValues, patientValidationSchema } from "./AddPatients.data";
import { getDataApi, postDataApi, putDataApi } from "@/backend/baseAxios";
import { ISpecialites, IStates } from "@/interfaces/specialities.interface";
import { useState, useEffect } from "react";
import { ISelect } from "@/components/Selector/Selector.data";
import { BaseResponse } from "@/interfaces/base-response.interface";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IPatient } from "@/interfaces/patients.interface";

export const AddPatients = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const [dataOptSpecialities, setDataOptSpecialities] = useState<ISelect[]>([]);
  const [dataCurrentPatientsStatusSelector, setDataCurrentPatientsStatusSelector] = useState<ISelect[]>([]);
  const [text, setText] = useState<string>('Añadir');
  const getPatient: IPatient = JSON.parse(localStorage.getItem('patientEdit') as string);
  const [defaultValues, setDefaultValues] = useState<ICreatePatient>(initialValues);
  const { toast } = useToast();

  const form = useForm<ICreatePatient>({
    defaultValues,
    resolver: zodResolver(patientValidationSchema)
  });

  const { reset } = form;
  const { isValid } = form.formState;

  const showToast = (baseResponse: BaseResponse) => {
    toast({
      variant: baseResponse.success ? 'default' : "destructive",
      description: baseResponse.message,
      className: `!left-0 !right-0 !mx-auto !w-full ${baseResponse.success && 'bg-blue-900 text-white'} font-bold text-center`,
      duration: 1500
    })
  }

  const onSubmit = async (newPatient: ICreatePatient) => {
    if (text == 'Añadir') {
      await postDataApi(`/patients`, newPatient).then((response: BaseResponse) => {
        showToast(response);
        if (response.success) {
          setTimeout(() => {
            goBack();
          }, 1500);
        }
      })
    }

    if (text == 'Editar') {
      await putDataApi(`/patients`, getPatient.patients_id, newPatient).then((response: BaseResponse) => {
        showToast(response);

        if (response.success) {
          setTimeout(() => {
            goBack();
          }, 1500);
        }
      })
    }
  }

  const getSpecialitiesApi = async () => {
    if(dataOptSpecialities.length == 0){
      await getDataApi(`/specialities`).then((response: ISpecialites[]) => {
        if (response.length > 0) {
          const options: ISelect[] = response.map((opt) => {
            return {
              selectLabel: opt.surgery_type_name,
              selectValue: opt.surgery_type_id.toString(),
            };
          });
          setDataOptSpecialities(options);
        }
      });
    }
  };

  const getStatesPatientApi = async () => {
    if(dataCurrentPatientsStatusSelector.length == 0){
      await getDataApi(`/patients/states`).then((response: IStates[]) => {
        if (response.length > 0) {
          const options: ISelect[] = response.map((opt) => {
            return {
              selectLabel: opt.surgery_state_name,
              selectValue: opt.surgery_state_id.toString(),
            };
          });
          setDataCurrentPatientsStatusSelector(options);
        }
      });
    }
  };

  useEffect(() => {
    getSpecialitiesApi();
    getStatesPatientApi();
    detectedEdit();

  }, [dataOptSpecialities, dataCurrentPatientsStatusSelector]);

  const detectedEdit = () => {
    if (location.pathname.includes('editar')) {
      setText('Editar');
      const parsePatient: ICreatePatient = {
        fullName: getPatient.patients_name,
        speciality: getPatient.patients_surgery_type_id.toString(),
        state: getPatient.patients_surgery_state_id.toString(),
        date_start: new Date(getPatient.patients_started_date)
      };
      
      setDefaultValues(parsePatient);
      reset(parsePatient);
    }
  }

  const goBack = () => {
    localStorage.removeItem('patientEdit');
    navigateTo(-1);
  }

  return (
    <div className="w-[100%]">
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-bed mx-2" /> {text} Paciente
        </h1>
        <Separator className="mt-3" />
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-neutral-600">
          INFORMACIÓN DEL PACIENTE
        </h1>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center justify-between flex-wrap gap-5 w-full">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (

                <FormItem>
                  <FormLabel>Nombre y Apellido del Paciente</FormLabel>
                  <FormControl>
                    <Input className="w-[300px]" placeholder="Inserte Nombre....." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Cirugía</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="!w-[300px]">
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      {dataOptSpecialities && dataOptSpecialities.map((opt: ISelect, index: number) => (
                        <SelectItem key={index} value={opt.selectValue.toString()}>{opt.selectLabel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date_start"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2">
                  <FormLabel>Fecha de Ingreso</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[300px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?
                            format(field.value, "PPP", { locale: es })
                            : <span>Seleccione Fecha</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        locale={es}
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado del Paciente</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl className="!w-[300px]">
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent >
                      {dataCurrentPatientsStatusSelector && dataCurrentPatientsStatusSelector.map((opt: ISelect, index: number) => (
                        <SelectItem key={index} value={opt.selectValue.toString()}>{opt.selectLabel}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-start gap-5 w-full">

              <Button
                onClick={goBack}
                type="button"
                className="bg-red-700 hover:bg-red-800 flex justify-center"
              >
                <i className="fa-solid fa-xmark mx-1" />
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={!isValid}
                className="disabled:bg-gray-400 bg-blue-900 hover:bg-blue-950 flex justify-center"
              >
                <i className="fa-solid fa-floppy-disk mx-1" />
                Guardar
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  );
};
