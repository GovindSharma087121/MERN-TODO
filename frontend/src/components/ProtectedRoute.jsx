import { Navigate } from "react-router-dom"

const ProtectedRoute = ({children}) =>{

    console.log("ProtectedRoute ",children);
    if(!localStorage.getItem("login")){
      return <Navigate to={'/login'}/>
    }

    return children;
}

export default ProtectedRoute;