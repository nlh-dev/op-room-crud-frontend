import { Separator } from "@/components/ui/separator";

export const PreviousPatients = () => {
  return (
    <div>
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-hospital-user mx-2" />Pacientes Previos
        </h1>
        <Separator className="mt-3" />
      </div>
    </div>
  );
};
