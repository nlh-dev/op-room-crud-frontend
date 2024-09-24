import { ISelect } from "@/components/Selector/Selector.data";

export interface IPatientsStatus{
    options: ISelect;
}

export const CurrentPatientsStatusSelector: ISelect[] = [
    {
        selectLabel: 'En Reposo',
        selectValue: 'resting',
    },
    {
        selectLabel: 'En Operacion',
        selectValue: 'operating',
    },
]