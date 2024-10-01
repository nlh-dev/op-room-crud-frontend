/* eslint-disable @typescript-eslint/no-explicit-any */
// REACT IMPORTS
import { FC } from "react";

// UI COMPONENTS
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// DATA COMPONENTS
import { ITable } from "./TableComponent.data";
import { Selector } from "../Selector/Selector";
import { AlertDialog } from "../AlertDialog/AlertDialog";

export const TableComponent: FC<ITable> = ({ columns, dataTable, returnData }) => {

  const actionIcon = (action?: string, data?: any) => {
    if (returnData) returnData(action as string, data)
  }

  return (
    <Table>
      <TableHeader className="bg-blue-900">
        <TableRow>
          {columns && columns.map((col, index: number) => (
            <TableHead className="text-white w-[100px] text-center" key={index}>{col.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable && dataTable.map((table, index: number) => (
          <TableRow key={index} className="align-middle items-center text-center">
            {columns && columns.map((col, index: number) => (
              <TableCell key={index} className="font-medium py-3">
                {col.type == "text" ? col.column(table) : ''}
                {col.type == 'icon' && (
                  <div className="flex items-center justify-evenly">
                    {col.icons && col.icons.map((ic: string, indexIcon: number) => (
                      <TableCell>
                        <Button className={`${col.className[indexIcon]}`} onClick={() => actionIcon((col.actionIcons && col.actionIcons[indexIcon].toString() as string), table)}>
                          <i className={`${ic}`} />
                        </Button>
                      </TableCell>
                    ))}
                  </div>
                )}
                {col.type == 'select' && (
                  <div className="selectField flex justify-center items-center">
                    <TableCell>
                      <Selector select={col.selectComponent} value={col.column(table)}/>                      
                    </TableCell>
                  </div>
                )}
                {col.type == 'dialog' &&(
                  <AlertDialog/>
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
