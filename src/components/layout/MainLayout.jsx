import { Outlet } from "react-router-dom";

import {Header} from "../header";
import {Footer} from "../footer";
export const MainLayout = () => {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
