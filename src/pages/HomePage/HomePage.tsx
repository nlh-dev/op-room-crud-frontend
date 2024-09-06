import { Separator } from "@/components/ui/separator";

export const HomePage = () => {
  return (
    <div>
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-home mx-2" /> Inicio
        </h1>
        <Separator className="mt-3" />
      </div>
    </div>
  );
};
