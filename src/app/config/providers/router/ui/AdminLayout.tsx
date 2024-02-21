import { Outlet } from "react-router-dom";
import { AdminHeader } from "widgets/header";

export const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <Outlet />
    </>
  );
};
