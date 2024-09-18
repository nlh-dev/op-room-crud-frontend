// REACT IMPORTS
import ssmrlogo from "../../assets/ssmr-3.png";

// DATA COMPONENTS

// UI COMPONENTS (SHADCN)
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function Login() {
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
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nombre de Usuario</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Ingrese Usuario...."
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Contraseña</Label>
                <Input
                  type="password"
                  id="name"
                  placeholder="Ingrese Contraseña...."
                />
              </div>
              <div className="flex align-middle items-center space-x-2">
                <Switch id="showPassword" />
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
