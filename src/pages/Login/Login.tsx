// REACT IMPORTS
import { useState } from "react";

// ASSETS IMPORTS
import ssmrlogo from "../../assets/ssmr-3.png";
import { zodResolver } from "@hookform/resolvers/zod";

// UI COMPONENTS (SHADCN)
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { defaultValues, ILogin, loginValidationSchema } from "./login.data";
import { postDataApi } from "@/backend/baseAxios";
import { BaseResponse, ResponseLogin } from "@/interfaces/base-response.interface";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export function Login() {
  const navigate = useNavigate();
  const { toast } = useToast()

  const { register, handleSubmit } = useForm<ILogin>({
    defaultValues,
    resolver: zodResolver(loginValidationSchema)
  });

  const showToast = (baseResponse: BaseResponse) => {
    toast({
      variant: baseResponse.success ? 'default' : "destructive",
      description: baseResponse.message,
      className: `!left-0 !right-0 !mx-auto !w-full ${baseResponse.success && 'bg-blue-900 text-white'} font-bold text-center`,
      duration: 1500
    })
  }

  const onSubmit = async (login: ILogin) => {

    await postDataApi(`/auth`, login).then((response: BaseResponse | ResponseLogin) => {
      const parseResponse: ResponseLogin = response as ResponseLogin;
      showToast(response);
      if (response.success) {
        localStorage.setItem('user', JSON.stringify(parseResponse.user));
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }
    })
  }

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="w-full flex justify-center items-center align-middle mt-[150px]">
      <Card className="w-[380px]">
        <CardHeader>
          <div className="flex align-middle items-center">
            <img className="ssmrlogo1 h-[50px] " src={ssmrlogo} />
            <CardTitle className="mx-3">
              Inicio de Sesión
              <CardDescription className="">Quirófano</CardDescription>
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input
                  type="text"
                  id="userName"
                  {...register('username')}
                  placeholder="Ingrese Usuario...."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  {...register('password')}
                  type={visible ? 'text' : 'password'}
                  placeholder="Ingrese Contraseña...."
                />
              </div>
              <div className="flex align-middle items-center space-x-2">
                <Switch onClick={() => setVisible(!visible)} />
                <Label>Mostrar Contraseña</Label>
              </div>
            </div>
            <div className="w-full flex justify-center items-center mt-5">
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-950 w-[150px]">
                <i className="fa-solid fa-right-to-bracket" />
                <span className="mx-2 my-2">Acceder</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
