import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ITable } from "./TableComponent.data";
import { FC } from "react";

export const TableComponent: FC<ITable> = ({columns, dataTable}) => {
  return (
        <Table>
          <TableHeader className="bg-blue-900">
            <TableRow>
              {columns && columns.map((col, index: number) =>(
                <TableHead key={index}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTable && dataTable.map((table) => (
            <TableRow>
              {columns && columns.map((col, index: number) => (
                <TableCell key={index} className="font-medium">
                  {col.type == 'text' && (
                    <span>{col.column(table)}</span>
                  )}

                  {col.type == 'icon' && (
                    <div className="flex justify-between items-center">
                      {col.icons && col.icons?.map((icon: string, indexIcon: number) => (

                      ))}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
            ))}
          </TableBody>
        </Table>


  );
};
