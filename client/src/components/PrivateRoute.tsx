import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute: FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser ? <Outlet /> : <Navigate to="/user/login" />;
};

export default PrivateRoute;
