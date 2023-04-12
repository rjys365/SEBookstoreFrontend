import { useContext } from "react";
import { LoginDispatchContext } from "../service/LoginContext";
import { useNavigate, useSearchParams } from "react-router-dom";

export const Login=()=>{
    const navigate=useNavigate();
    const loginDispatch=useContext(LoginDispatchContext);
    //const backPath=useSearchParams().
    const handleLogin=(e)=>{
        e.preventDefault();
        if(e.target.username.value==="rjys365"&&e.target.password.value==="123456"){
            loginDispatch({type:"login"});
            navigate('/');
        }
        else alert('无效登录！');
    }
    return (<div>
        <h1>登录 用户名：rjys365 密码：123456</h1>
        <form onSubmit={handleLogin}>
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="password" placeholder="password"/>
            <button type="submit">Login</button>
        </form>
    </div>);
}