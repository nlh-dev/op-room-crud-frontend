import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FC } from "react";
import { IDeleteDialog } from "./DeleteDialog.data";
import { Button } from "../ui/button";

export const DeleteDialog: FC<IDeleteDialog> = ({open, close, text}) => {
  return (
    <div onClick={() => close(false)} >
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle onClick={() => close(false)} className="text-center">{text}</DialogTitle>

            <DialogDescription className="w-full flex items-center justify-center gap-5 !mt-8">
              
              <Button onClick={() => close(false)} variant={'destructive'}>Cancelar555</Button>
              <Button onClick={() => close(true)} className="bg-blue-900 text-white hover:bg-blue-950 transition-all">Confirmar</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};
