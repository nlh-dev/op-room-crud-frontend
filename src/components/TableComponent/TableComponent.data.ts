/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISelect } from "../Selector/Selector.data";

export type TypeColumns = "text" | "icon" | "select" | "dialog";

export interface IColumns<T> {
    header: string;
    column: (data: T) => string;
    type: TypeColumns;
    actionIcons?: string[];
    icons?: string[];
    className: string[];
    selectComponent?: ISelect[];
}

export interface ITable {
    columns: IColumns<any>[];
    dataTable: any[];
    returnData?: (icon: string, data: any) => void;
}