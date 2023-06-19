import {useContext, useEffect, useState} from "react";
import {LoginDispatchContext} from "../service/LoginContext";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {Spin} from "antd";
import Title from "antd/es/typography/Title";

export const Login = () => {
    const navigate = useNavigate();
    const loginDispatch = useContext(LoginDispatchContext);
    const [loginRequest, setLoginRequest] = useState(null);
    const [searchParams] = useSearchParams();

    const backPath = searchParams.get('back');
    const handleLogin = (e) => {
        e.preventDefault();
        setLoginRequest({username: e.target.username.value, password: e.target.password.value});
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
    if (loginRequest != null) {
        return (<div>
            <Spin size="large"/>
        </div>);
    }
    return (<div>
        <Title level={4}>登录</Title>
        <form onSubmit={handleLogin}>
            <input type="text" name="username" placeholder="username"/>
            <input type="password" name="password" placeholder="password"/>
            <button type="submit">Login</button>
        </form>
        <Title level={4}><Link to='/register'>注册</Link></Title>
    </div>);
}
