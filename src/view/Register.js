import Title from "antd/es/typography/Title";
import {Button, Form, Input} from "antd";
import {useContext, useEffect, useState} from "react";
import {LoginDispatchContext} from "../service/LoginContext";
import {submitRegister} from "../service/SubmitRegister";
import {useNavigate} from "react-router-dom";

export function Register() {
    const loginDispatch = useContext(LoginDispatchContext);
    const [registerRequest,setRegisterRequest]=useState(null);
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
    const navigate=useNavigate();
    const onSubmit = (values) => {
        // alert('Received values of form: ' + JSON.stringify(values));
        setRegisterRequest({
            name:values.name,
            password:values.password,
            email:values.email
        });
    };
    useEffect(()=>{
        const submit=async ()=>{
            try{
                const response=await submitRegister(registerRequest);
                loginDispatch({type:'login',login:response});
                await new Promise((resolve) => setTimeout(resolve, 0));
                navigate("/");
            }catch(e){
                alert('注册失败！');
                setRegisterRequest(null);
            }
        };
        if(registerRequest!==null){
            submit();
        }
    },[registerRequest]);
    return (
        <div className='register-view'>
            <Title level={4}>
                注册
            </Title>
            <Form
                {...formItemLayout}
                form={form}
                name="register"
                onFinish={onSubmit}
                style={{maxWidth: 600}}
                scrollToFirstError
            >
                <Form.Item
                    name='name'
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
                <Form.Item
                    name="confirm_password"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: '请再次输入密码',
                        },
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('两次输入的密码不匹配'));
                            },
                        }),
                    ]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name='email'
                    label='电子邮箱'
                    rules={[
                        {
                            required: true,
                            message: '请输入电子邮箱'
                        }
                    ]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
