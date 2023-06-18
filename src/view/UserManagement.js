import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../service/LoginContext";
import { Navigate } from "react-router-dom";
import { renderIntoDocument } from "react-dom/test-utils";
import { UserList } from "../component/UserList";

export function UserManageMent(){
    const login=useContext(LoginContext);
    const [userList,setUserList]=useState(null);
    const [fetchingUserList,setFetchingUserList]=useState(true);
    useEffect(()=>{
        if(!fetchingUserList)return;
        const load=async ()=>{
            const response=await fetch('http://localhost:8080/users/allUsers?getterId='+login.userId);
            const json=await response.json();
            setUserList(json);
            setFetchingUserList(false);
        };
        load();
    },[fetchingUserList,login.userId]);
    const blockUser=(id)=>{
        const load=async ()=>{
            const response=await fetch('http://localhost:8080/users/'+id+'/block?blockerId='+login.userId,{method:'POST'});
            if(response.status!==200)alert("操作失败！");
            const json=await response.json();
            await new Promise((resolve) => setTimeout(resolve, 0));
            setFetchingUserList(true);
        };
        load();
    }
    const unBlockUser=(id)=>{
        const load=async ()=>{
            const response=await fetch('http://localhost:8080/users/'+id+'/unblock?unBlockerId='+login.userId,{method:'POST'});
            if(response.status!==200)alert("操作失败！");
            const json=await response.json();
            await new Promise((resolve) => setTimeout(resolve, 0));
            setFetchingUserList(true);
        };
        load();
    }
    if(!login.token)return <Navigate to={'/login?back='+encodeURIComponent('/userManagement')}/>;
    if(login.role!==2)return <div>非管理员，无法管理用户。</div>;
    if(fetchingUserList||userList===null)return <div>请稍候</div>;
    return <UserList users={userList} blockUser={blockUser} unBlockUser={unBlockUser}/>;
}
