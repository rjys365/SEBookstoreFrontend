import { useContext, useEffect, useState } from "react";
import { LoginDispatchContext } from "../service/LoginContext";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const loginDispatch = useContext(LoginDispatchContext);
    const [loginRequest, setLoginRequest] = useState(null);
    const [loginResult, setLoginResult] = useState(null);
    const [searchParams] = useSearchParams();

    const backPath = searchParams.get('back');
    //const backPath=useSearchParams().
    const handleLogin = (e) => {
        e.preventDefault();
        // if(e.target.username.value==="rjys365"&&e.target.password.value==="123456"){
        //     loginDispatch({type:"login"});
        //     navigate(backPath?decodeURIComponent(backPath):"/");
        // }
        // else alert('无效登录！');
        setLoginRequest({ username: e.target.username.value, password: e.target.password.value });
    }
    const handleLoginSuccess = async (json) => {
        // 更新登录状态
        loginDispatch({
            type: "login",
            login: {
                token: json.token,
                userId: json.userId,
                role: json.role,
            }
        });

        // 等待状态更新完成
        await new Promise((resolve) => setTimeout(resolve, 0));

        // 重定向到适当的页面
        navigate(backPath ? decodeURIComponent(backPath) : "/");
    };

    useEffect(() => {
        if (loginRequest !== null) {
            const login = async () => {
                const response = await fetch('http://localhost:8080/users/login?username=' + loginRequest.username + "&password=" + loginRequest.password, {
                    method: 'POST'
                });
                if (response.status !== 200) {
                    alert('登录失败！');
                    setLoginRequest(null);
                    return;
                }
                const json = await response.json();
                handleLoginSuccess(json);
            };
            login();
        }
    }, [loginRequest]);
    useEffect(() => {
        if (loginResult !== null) {
            loginDispatch({ type: "login", token: loginResult.token, userId: loginResult.userId, role: loginResult.role });
            navigate(backPath ? decodeURIComponent(backPath) : "/");
        }
    }, [loginResult, loginDispatch, navigate, backPath]);
    if (loginRequest != null && loginResult === null) {
        return (<div>
            <h1>请稍候</h1>
        </div>);
    }
    return (<div>
        <h1>登录</h1>
        <form onSubmit={handleLogin}>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Login</button>
        </form>
    </div>);
}