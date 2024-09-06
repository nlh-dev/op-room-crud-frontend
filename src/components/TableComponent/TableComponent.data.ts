/* eslint-disable @typescript-eslint/no-explicit-any */

export type TypeColumns = "text" | "icon" | "select";

export interface IColumns<T> {
    header: string;
    column: (data: T) => string;
    type: TypeColumns;
    actionIcons?: string[];
    icons?: string[];
    className: string[];
}

export interface ITable {
    columns: IColumns<any>[];
    dataTable: any[];
    returndata: (icon: string | undefined |  null, data: any) => void;
}