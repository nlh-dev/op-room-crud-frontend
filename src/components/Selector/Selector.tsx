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

export const Selector: FC<ISelectComponent> = ({ select, className, value }) => {
  return (
    <div className={`${className ? className : 'w-[180px]'}`}>
      <Select value={value}>
        <SelectTrigger className="w-full">
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
    </div>
  );
};
