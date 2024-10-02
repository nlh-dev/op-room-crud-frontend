import { postDataApi, putDataApi } from '@/backend/baseAxios';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useToast } from '@/hooks/use-toast';
import { IUserData, BaseResponse } from '@/interfaces/base-response.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';

import { ICreateSpeciality, initialValues, specialityValidationSchema } from './AddSpecialities.data';
import { Separator } from '@/components/ui/separator';

export const AddSpecialities = () => {
    const navigateTo = useNavigate();
    const location = useLocation();
    const { toast } = useToast();
    const getUser: IUserData = JSON.parse(localStorage.getItem('userEdit') as string);

    const [text, setText] = useState<string>('Añadir');
    const [defaultValues, setDefaultValues] = useState<ICreateSpeciality>(initialValues);

    const form = useForm<ICreateSpeciality>({
        defaultValues,
        resolver: zodResolver(specialityValidationSchema)
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

    const onSubmit = async (newSpeciality: ICreateSpeciality) => {

        // if (text == 'Añadir') {
            await postDataApi(`/specialities`, newSpeciality).then((response: BaseResponse) => {
                showToast(response);

                if (response.success) {
                    setTimeout(() => {
                        goBack();
                    }, 1500);
                }
            })
        // }

        if (text == 'Editar') {
            await putDataApi(`/specialities`, getUser.id, newSpeciality).then((response: BaseResponse) => {
                showToast(response);

                if (response.success) {
                    setTimeout(() => {
                        goBack();
                    }, 1500);
                }
            })
        }
    }

    const goBack = () => {
        localStorage.removeItem('userEdit');
        navigateTo('/intervenciones');
    }

    useEffect(() => {
        if (location.pathname.includes('editar')) {
            setText('Editar');
            const parseUser: ICreateSpeciality = {
                speciality: getUser.op_users
            }
            setDefaultValues(parseUser);
            reset(parseUser);
        }
    }, [location, reset, getUser])

    return (
        <div className="w-[100%]">
            <div>
                <div className="pageInfo">
                    <h1 className="text-2xl font-bold text-neutral-600">
                        <i className={`fa-solid ${text == 'Añadir' ? 'fa-brands fa-medrt mx-2' : 'fa-user-pen'}`} /> {text} Especialidad
                    </h1>
                    <Separator className='mt-3'/>
                </div>
            </div>
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-neutral-600">INFORMACIÓN DE LA ESPECIALIDAD</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="formContainer w-[100%] flex justify-between items-center mt-5">
                            <FormField
                                control={form.control}
                                name="speciality"
                                render={({ field }) => (

                                    <FormItem>
                                        <FormLabel>Nombre de la Especialidad</FormLabel>
                                        <FormControl>
                                            <Input className="w-[300px]" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="buttonsContainer w-full flex justify-start items-center mt-5">

                            <Button onClick={goBack} type="button" className="bg-red-700 hover:bg-red-800 flex justify-center">
                                <i className="fa-solid fa-xmark mx-1" />Cancelar
                            </Button>

                            <Button type="submit" disabled={!isValid} className="disabled:bg-gray-400 bg-blue-900 hover:bg-blue-950 flex justify-center mx-5">
                                <i className="fa-solid fa-floppy-disk mx-1" />Guardar
                            </Button>

                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
}
