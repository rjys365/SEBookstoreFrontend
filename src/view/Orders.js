import { Empty } from "antd";
import React, { useContext } from "react";
import { LoginContext } from "../service/LoginContext";
import { Navigate } from "react-router-dom";
export function Orders(){
    const login=useContext(LoginContext);
    if(!login.token)return <Navigate to='/login'/>;
    return (
        <div>
            <Empty description="暂无订单"/>
        </div>
    )
}