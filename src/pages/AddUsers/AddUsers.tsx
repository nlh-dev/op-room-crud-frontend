// REACT IMPORTS
import { useNavigate } from "react-router-dom";

// UI COMPONENTS (SHADCN)
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SelectorComponent } from "@/components/Selector/Selector";

export const AddUsers = () => {
  const navigateTo = useNavigate();
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
        <h1 className="text-2xl font-bold text-neutral-600">
          INFORMACIÓN DE USUARIO
        </h1>
        <div className="formContainer mt-5">
        <form action="">
          <div className="">
            <div>
              <Label className="" htmlFor="userName">Nombre de Usuario</Label>
              <Input className="w-[30%] mx-3" type="text"/>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};
