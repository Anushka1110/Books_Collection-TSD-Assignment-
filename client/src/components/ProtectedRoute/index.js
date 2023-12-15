import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const ProtectedRoute = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
    useEffect(()=>{
        const token = Cookie.get("jwt_token");
        if(token===undefined){
            navigate("/login")
        }
    })
  return (
    <div>
        <Component/>
    </div>
  )
};

export default ProtectedRoute;

