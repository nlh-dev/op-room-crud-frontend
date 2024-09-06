import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { ITable } from "./TableComponent.data";
import { FC } from "react";

export const TableComponent: FC<ITable> = ({ columns, dataTable }) => {
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
        {dataTable && dataTable.map((table) => 
        <TableRow>
          {columns && columns.map((col, index: number) =>(
            <div className="flex" key={index}>
              {col.type == 'text' && (
                  <TableCell className="font-medium" key={index}>{col.column(table)}</TableCell>
              )}
              {col.type == 'icon' && (
                <div className="buttons">
                  {col.icons && col.icons.map((ic: string, indexIcon: number) =>(
                    <div className={`${col.className[indexIcon]}`}>
                      <TableCell>
                        <Button onClick={() => returndata(col.actionIcons[indexIcon], table)}>
                          <i className={`${ic}`}/>
                          </Button>
                      </TableCell>
                    </div>
                  ))}
                </div>
              )}
              </div>
          ))}
        </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
