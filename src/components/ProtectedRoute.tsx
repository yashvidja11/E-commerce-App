import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute:React.FC = () => {
    const {login} = useSelector((state:RootState)=>state.auth)
    
    
    if (login.email === undefined) {
      return <Navigate to="/signin" />
      }
      return <Outlet />;
}

export default ProtectedRoute;
