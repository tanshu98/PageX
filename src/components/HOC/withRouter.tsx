import { Component } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from "../LoginPage/Login";

const withRouter = (Component:React.ComponentType<any>)=> {
   return (props: any)=> {
    let location = useLocation();
    let navigate = useNavigate();
    return <Component {...props} location={location} navigate={navigate} />;
   }
}

export default withRouter;