import { Form, Typography, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";
import { LoginContext } from "../service/LoginContext";
import { Navigate } from "react-router-dom";
export function Profile() {
  const [profile,setProfile]=useState(
    {
      firstName:'张',
      lastName:'三',
      email:'zhangsan@sjtu.edu.cn',
      signature:'饮水思源，爱国荣校'
    });
  const login=React.useContext(LoginContext);
  // const {firsetName,setFirstName}=useState(profile.firstName);
  // const {lastName,setLastName}=useState(profile.lastName);
  // const {email,setEmail}=useState(profile.email);
  // const {signature,setSignature}=useState(profile.signature);
  const [form]=useForm();
  const handleFinish=(values)=>{
    const profile={
      firstName:values.firstName,
      lastName:values.lastName,
      email:values.email,
      signature:values.signature
    };
    //form.setFieldsValue(profile);
    //console.log(profile);
    setProfile(profile);
  }
  useEffect(()=>{
    form.setFieldsValue(profile);
  });
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const handleReset=()=>{
    form.setFieldsValue(profile);
  }
  if(!login.token)return <Navigate to='/login' />;
  return (
    <Typography>
      <Title level={2}>个人信息</Title>
      <Form form={form} onFinish={handleFinish}>
        <Form.Item label="姓" name="firstName" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item label="名" name="lastName" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item label="个性签名" name="signature" rules={[{required:true}]}>
          <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
          <Button onClick={handleReset}>取消</Button>
        </Form.Item>
      </Form>
    </Typography>
  );
}