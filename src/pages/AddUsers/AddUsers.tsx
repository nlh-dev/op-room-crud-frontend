// REACT IMPORTS
import { useLocation, useNavigate } from "react-router-dom";


// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button";
// import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// DATA COMPONENTS
import { initialValues, ICreateUser, UserRolesSelector, userValidationSchema, UserStateSelector } from "./AddUsers.data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ISelect } from "@/components/Selector/Selector.data";
import { postDataApi, putDataApi } from "@/backend/baseAxios";
import { BaseResponse, IUserData } from "@/interfaces/base-response.interface";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export const AddUsers = () => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const getUser: IUserData = JSON.parse(localStorage.getItem('userEdit') as string);
  const [text, setText] = useState<string>('Añadir');
  const [defaultValues, setDefaultValues] = useState<ICreateUser>(initialValues);

  const form = useForm<ICreateUser>({
    defaultValues,
    resolver: zodResolver(userValidationSchema)
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

  const onSubmit = async (newUser: ICreateUser) => {

    if (text == 'Añadir') {
      await postDataApi(`/users`, newUser).then((response: BaseResponse) => {
        showToast(response);

        if (response.success) {
          setTimeout(() => {
            goBack();
          }, 1500);
        }
      })
    }

    if (text == 'Editar') {
      await putDataApi(`/users`, getUser.id, newUser).then((response: BaseResponse) => {
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
    navigateTo('/usuarios');
  }

  useEffect(() => {
    if (location.pathname.includes('editar')) {
      setText('Editar');
      const parseUser: ICreateUser = {
        name: getUser.op_users,
        password: getUser.op_users_password,
        role: getUser.op_users_role.toString(),
        state: getUser.op_users_state ? '1' : '0'
      }
      setDefaultValues(parseUser);
      reset(parseUser);
    }
  }, [location])



  return (
    <div className="w-[100%]">
      <div>
        <div className="pageInfo">
          <h1 className="text-2xl font-bold text-neutral-600">
            <i className={`fa-solid ${text == 'Añadir' ? 'fa-user-plus' : 'fa-user-pen'}`} /> {text} Usuario
          </h1>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-neutral-600">INFORMACIÓN DE USUARIO</h1>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="mt-5 flex items-center justify-between flex-wrap gap-5 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (

                  <FormItem>
                    <FormLabel>Nombre de Usuario</FormLabel>
                    <FormControl>
                      <Input className="w-[300px]" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <Input className="w-[300px]"{...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol de Usuario</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="!w-[300px]">
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent >
                        {UserRolesSelector && UserRolesSelector.map((opt: ISelect, index: number) => (
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
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado del Usuario</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl className="!w-[300px]">
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent >
                        {UserStateSelector && UserStateSelector.map((opt: ISelect, index: number) => (
                          <SelectItem key={index} value={opt.selectValue.toString()}>{opt.selectLabel}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
};
