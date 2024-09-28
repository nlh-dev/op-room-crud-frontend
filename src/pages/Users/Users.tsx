// REACT IMPORTS
import { useNavigate } from "react-router-dom";

// UI COMPONENTS (SHADCN)
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// DATA COMPONENTS
import { UserColumns } from "./Users.data";
import { TableComponent } from "@/components/TableComponent/TableComponent";
import { deleteDataApi, getDataApi } from "@/backend/baseAxios";
import { useEffect, useState } from "react";
import { BaseResponse, IUserData } from "@/interfaces/base-response.interface";
import { Loader } from "@/components/loader/Loader";
import { DeleteDialog } from "@/components/DeleteDialog/DeleteDialog";
import { useToast } from "@/hooks/use-toast";

export const Users = () => {
  const navigateTo = useNavigate();
  const [dataUsers, setDataUsers] = useState<IUserData[]>([]);
  const [baseDataUsers, setBaseDataUsers] = useState<IUserData[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<IUserData>();
  const {toast} = useToast();

  const getUsersApi = async () => {
    setLoader(true);
    await getDataApi(`/users`).then((response: IUserData[]) => {
      if (response.length > 0) {
        setDataUsers(response);
        setBaseDataUsers(response);
      }
      setLoader(false);
    })
  }

  const filterData = (filter: string): void => {
    const findData = baseDataUsers.filter(find => find.op_users.toLowerCase().includes(filter.toLowerCase()));
    setDataUsers(findData);
  }

  useEffect(() => {
    getUsersApi();
  }, []);

  const getDataTable = (icon: string, data: IUserData) => {
    if(icon == 'delete'){
      setDataSelected(data);
      setOpenDialog(true);
    }
    if(icon == 'edit'){
      navigateTo('editar');
      localStorage.setItem('userEdit',JSON.stringify(data));
    }
  }

  const closeDialog = (borrar: boolean) => {
    if (borrar) {
      deleteData();
    }
    setOpenDialog(false);
  }

  const deleteData = async () => {
    if (dataSelected) {
      await deleteDataApi('/users', dataSelected.id as number).then((response: BaseResponse) => {
        showToast(response);
        getUsersApi();
      })
    }
  }

  const showToast = (baseResponse: BaseResponse) => {
    toast({
      variant: baseResponse.success ? 'default' : "destructive",
      description: baseResponse.message,
      className: `!left-0 !right-0 !mx-auto !w-full ${baseResponse.success && 'bg-blue-900 text-white'} font-bold text-center`,
      duration: 1500
    })
  }

  return (
    <div>
      <div className="pageInfo">
        <h1 className="text-2xl font-bold text-neutral-600">
          <i className="fa-solid fa-users mx-2" />
          Usuarios
        </h1>
        <Separator className="mt-3" />
      </div>
      <div className="flex justify-end align-middle items-center mt-5">
        <Input className="w-[30%] mx-5" onChange={(e) => filterData(e.target.value)} placeholder="Buscar Usuario..." />
        <Button className="bg-blue-900 hover:bg-blue-950 w-[180px] h-[40px]" onClick={() => navigateTo("/usuarios/añadir")}>
          <span className="mx-2"><i className="fa-solid fa-circle-plus" /> Agregar Usuario</span>
        </Button>
      </div>

      <DeleteDialog open={openDialog} close={closeDialog} text={'¿Estas seguro de que quieres eliminar este usuario?'} />

      <div className="mt-5">
        {loader ? <Loader /> : (
          dataUsers && dataUsers.length > 0 ?
            <TableComponent columns={UserColumns} dataTable={dataUsers} returnData={getDataTable}/>
            : <p className="text-center">No se encontraron datos.</p>
        )}
      </div>
    </div>
  );
};
