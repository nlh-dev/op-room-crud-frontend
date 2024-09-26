export interface IAlertMessage{
    title: string;
    description: string;
}

export interface IAlertMessageComponent{
    message: IAlertMessage[];
    className?: string
}