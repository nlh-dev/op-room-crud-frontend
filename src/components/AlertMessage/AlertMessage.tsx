// REACT IMPORTS
import { FC } from "react";


// UI COMPONENTS (SHADCN)
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

//DATA COMPONENTS
import { IAlertMessageComponent } from "./AlertMessage.data";
import './AlertMessage.data'

export const AlertMessage:FC<IAlertMessageComponent> = ({ message, className }) => {
  return (
    <Alert>
      <Terminal className={`${className ? className : 'h-4 w-4'}`}/>
      {message && message.map((msg) => (
      <div>
      <AlertTitle>{msg.title}</AlertTitle>
      <AlertDescription>{msg.description}</AlertDescription>
      </div>
    ))}
    </Alert>
  );
};
