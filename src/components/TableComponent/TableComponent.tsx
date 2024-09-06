import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";
import { ITable } from "./TableComponent.data";
import { FC } from "react";

export const TableComponent: FC<ITable> = ({columns,dataTable,returndata,}) => {
  return (
    <Table>
      <TableHeader className="bg-blue-900">
        <TableRow>
          {columns && columns.map((col, index: number) => (
              <TableHead className="text-white w-[100px] text-center" key={index}>{col.header}  </TableHead>
            ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataTable && dataTable.map((table, index: number) => (
            <TableRow key={index} className="text-center">
              {columns && columns.map((col, index: number) => (
                      <TableCell key={index} className="font-medium">
                        {col.type == "text" ? col.column(table) : ''}
                        {col.type == 'icon' && (
                          <div className="buttons flex items-center justify-evenly">
                          {col.icons && col.icons.map((ic: string, indexIcon: number) => (
                                <TableCell>
                                  <Button className={`${col.className[indexIcon]}`} onClick={() =>returndata(col.actionIcons[indexIcon].toString(),table)}>
                                    <i className={`${ic}`} />
                                  </Button>
                                </TableCell>
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
