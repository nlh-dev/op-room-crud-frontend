// DATA COMPONENTS
import { FC } from "react";
import { ISelectComponent } from "./Selector.data";
import "./Selector.data";

// UI COMPONENTS (SHADCN)
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Selector: FC<ISelectComponent> = ({ select, value }) => {
  return (
      <Select value={value}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Seleccione" />
        </SelectTrigger>
        <SelectContent>
          {select && select.map((sel, index: number) => (
              <SelectItem key={index} value={sel.selectValue}>
                {sel.selectLabel}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
  );
};
