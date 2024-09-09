import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const SelectorComponent = () => {
  return (
    <div className="selectorContainer">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="resting">Reposo</SelectItem>
          <SelectItem value="operating">Operacion</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
