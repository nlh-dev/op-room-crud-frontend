import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { FC, useEffect } from "react"
import { Button } from "../ui/button";
import { defaultValues, IUpdatePatient, IUpdatePatientDialog, patientUpdateValidationSchema } from "./DialogUpdatePatient.data"
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export const DialogUpdatePatient: FC<IUpdatePatientDialog> = ({ open, close, text, value }) => {
    const form = useForm<IUpdatePatient>({
        defaultValues,
        resolver: zodResolver(patientUpdateValidationSchema)
    });
    const { isValid } = form.formState;

    const onSubmit = (updatePatient: IUpdatePatient) => {
        close(updatePatient);
    }

    useEffect(() => {
        if (value != null) {
            const setValue = {
                date_end: new Date(value)
            }
            form.reset(setValue);
        }
    }, [open])

    return (
        <div >
            <Dialog open={open} onOpenChange={() => close(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">{text}</DialogTitle>

                        <DialogDescription className="w-full flex items-center justify-center gap-5 !mt-8">

                            <Form  {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center gap-5 w-full">
                                    <FormField
                                        control={form.control}
                                        name="date_end"
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
                                                    <PopoverContent className="w-auto p-0" align="start" side="bottom">
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

                                    <Button
                                        type="submit"
                                        disabled={!isValid}
                                        className="disabled:bg-gray-400 bg-blue-900 hover:bg-blue-950 flex justify-center"
                                    >
                                        <i className="fa-solid fa-floppy-disk mx-1" />
                                        Guardar
                                    </Button>
                                </form>
                            </Form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}
