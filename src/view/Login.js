import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../service/LoginContext";
import {Link, Navigate, useNavigate, useSearchParams} from "react-router-dom";
import {Button, Form, Input, Spin} from "antd";
import Title from "antd/es/typography/Title";

export const Login = () => {
    const navigate = useNavigate();
    const {login,setLogin} = useContext(LoginContext);
    const [loginRequest, setLoginRequest] = useState(null);
    const [searchParams] = useSearchParams();
    const [navigatingTo,setNavigatingTo] = useState(null);

    const backPath = searchParams.get('back');
    const handleLogin = (values) => {
        // e.preventDefault();
        setLoginRequest({username: values.username, password: values.password});
    }
    const handleLoginSuccess = async (json) => {
        // 更新登录状态
        setLogin({
                token: json.userId,
                userId: json.userId,
                role: json.role,
            }
        );

        // 等待状态更新完成
        await new Promise((resolve) => setTimeout(resolve, 0));
        // console.log(backPath ? decodeURIComponent(backPath) : "/");
        // 重定向到适当的页面
        // navigate(backPath ? decodeURIComponent(backPath) : "/");
        setNavigatingTo(backPath ? decodeURIComponent(backPath) : "/");
    };
    const formItemLayout = {
        labelCol: {
            xs: {span: 24},
            sm: {span: 8},
        },
        wrapperCol: {
            xs: {span: 24},
            sm: {span: 16},
        },
    };
    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 0,
            },
            sm: {
                span: 16,
                offset: 8,
            },
        },
    };
    const [form] = Form.useForm();

    useEffect(() => {
        if (loginRequest !== null) {
            const login = async () => {
                const response = await fetch('http://localhost:8080/login/?username=' + loginRequest.username + "&password=" + loginRequest.password, {
                    method: 'POST',
                    credentials: 'include'
                });
                if (response.status !== 200) {
                    alert('登录失败！');
                    setLoginRequest(null);
                    return;
                }
                const json = await response.json();
                await handleLoginSuccess(json);
            };
            login();
        }
    }, [loginRequest]);
    if(navigatingTo){
        return <Navigate to={navigatingTo}/>
    }
    if (loginRequest != null) {
        return (<div>
            <Spin size="large"/>
        </div>);
    }
    return (<div>
        <Title level={4}>登录</Title>
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={handleLogin}
            style={{maxWidth: 600}}
            scrollToFirstError>
            <Form.Item
                name='username'
                label='用户名'
                rules={[
                    {
                        required: true,
                        message: '请输入用户名'
                    }
                ]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="password"
                label="密码"
                rules={[
                    {
                        required: true,
                        message: '请输入密码',
                    },
                ]}
                hasFeedback
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
            </Form.Item>
        </Form>
        <Title level={4}><Link to='/register'>注册</Link></Title>
    </div>);
}
