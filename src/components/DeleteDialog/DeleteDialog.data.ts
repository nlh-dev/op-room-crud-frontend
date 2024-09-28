export interface IDeleteDialog {
    open: boolean;
    close: (borrar: boolean) => void;
    text: string;
}