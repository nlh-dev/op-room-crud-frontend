// REACT IMPORTS
import { useNavigate } from "react-router-dom";


// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

// DATA COMPONENTS
import { defaultValues, ICreateUser, UserRolesSelector, userValidationSchema } from "./AddUsers.data";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ISelect } from "@/components/Selector/Selector.data";
import { postDataApi } from "@/backend/baseAxios";
import { BaseResponse } from "@/interfaces/base-response.interface";
import { useToast } from "@/hooks/use-toast";

export const AddUsers = () => {
  const navigateTo = useNavigate();
  const { toast } = useToast();

  const form = useForm<ICreateUser>({
    defaultValues,
    resolver: zodResolver(userValidationSchema)
  });

  const showToast = (baseResponse: BaseResponse) => {
    toast({
      variant: baseResponse.success ? 'default' : "destructive",
      description: baseResponse.message,
      className: `!left-0 !right-0 !mx-auto !w-full ${baseResponse.success && 'bg-blue-900 text-white'} font-bold text-center`,
      duration: 1500
    })
  }

  const onSubmit = async (newUser: ICreateUser) => {
    await postDataApi(`/users`, newUser).then((response: BaseResponse) => {
      showToast(response);

      if (response.success) {
        setTimeout(() => {        
          navigateTo('/usuarios');
        }, 1500);
      }
    })
  }



  return (
    <div className="w-[100%]">
      <div>
        <div className="pageInfo">
          <h1 className="text-2xl font-bold text-neutral-600">
            <i className="fa-solid fa-user-plus" /> Añadir Usuario
          </h1>
          <Separator className="mt-3" />
        </div>
      </div>
      <div className="mt-5">
        <h1 className="text-2xl font-bold text-neutral-600">INFORMACIÓN DE USUARIO</h1>
        <Form  {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="formContainer w-[100%] flex justify-between items-center mt-5">

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
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            </div>

            <div className="buttonsContainer w-full flex justify-start items-center mt-5">

              <Button onClick={() => navigateTo('/usuarios')} type="button" className="bg-red-700 hover:bg-red-800 flex justify-center">
                <i className="fa-solid fa-xmark mx-1" />Cancelar
              </Button>

              <Button type="submit" className="bg-blue-900 hover:bg-blue-950 flex justify-center mx-5">
                <i className="fa-solid fa-floppy-disk mx-1" />Guardar
              </Button>

            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
