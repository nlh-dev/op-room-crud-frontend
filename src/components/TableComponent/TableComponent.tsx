/* eslint-disable @typescript-eslint/no-explicit-any */
// REACT IMPORTS
import { FC, useEffect, useState } from "react";

// UI COMPONENTS
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// DATA COMPONENTS
import { ITable } from "./TableComponent.data";
// import { Selector } from "../Selector/Selector";
// import { AlertDialog } from "../AlertDialog/AlertDialog";

import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table"
// import { ScrollArea } from "../ui/scroll-area";

export const TableComponent: FC<ITable> = ({ columns, dataTable, returnData }) => {

  const [pageNumber, setPageNumber] = useState<number>(5);
  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: pageNumber } }
  })
  const changeLengthPaginate = (numberPage: string) => {
    setPageNumber(Number(numberPage))
  }

  useEffect(() => {
    table.setPageSize(pageNumber);
  }, [pageNumber, table])

  const actionIcon = (action?: string, data?: any) => {
    if (returnData) returnData(action as string, data)
  }

  return (
    <>
      {/* <ScrollArea className=" !h-[60vh] relative"> */}
      <div className=" !h-[60vh] relative overflow-y-auto">
        <Table className=" relative">
          <TableHeader className="bg-blue-900 sticky top-0">
            <TableRow>
              {columns && columns.map((col, index: number) => (
                <TableHead className="text-white w-[100px] text-center" key={index}>{col.header}  </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody >
            {table && table.getRowModel().rows.map((row, rowIndex: number) => (
              <TableRow key={rowIndex} className="text-center ">
                {columns && columns.map((col, colIndex: number) => (
                  <TableCell key={colIndex} className="font-medium py-2">
                    {col.type === "text" ? col.column(row.original) : null}

                    {col.type === 'icon' && (
                      <div className="flex items-center justify-evenly">
                        {col.icons && col.icons.map((ic: string, iconIndex: number) => (
                          <Button key={iconIndex} className={col.className[iconIndex]} onClick={() => actionIcon((col.actionIcons && col.actionIcons[iconIndex]), row.original)}>
                            <i className={ic} />
                          </Button>
                        ))}
                      </div>
                    )}

                    {/* {col.type == 'select' && (
                      <div className="selectField flex justify-center items-center">
                        <TableCell>
                          <Selector select={col.selectComponent} value={col.column(table)} />
                        </TableCell>
                      </div>
                    )} */}
                    {/* {col.type == 'dialog' && (
                      <AlertDialog />
                    )} */}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {dataTable && dataTable.length > 5 && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            className="bg-blue-900 text-white hover:bg-blue-950 transition-all w-10 disabled:bg-gray-400"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </Button>

          <select 
          className="px-2 border-[1.9px] border-solid rounded-md py-[0.35rem] outline-none border-[#e8e8eb]" 
          onChange={(e) => changeLengthPaginate(e.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>

          <Button
            size="sm"
            className="bg-blue-900 text-white hover:bg-blue-950 transition-all w-10 disabled:bg-gray-400"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </Button>
        </div>
      )}
    </>
  );
};
