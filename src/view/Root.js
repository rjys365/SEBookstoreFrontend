import React, { useContext } from "react";
import './Root.css';
import { Breadcrumb, Layout, Menu, theme, SubMenu } from 'antd';
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { LoginContext, LoginProvider } from "../service/LoginContext";

const { Header, Content, Footer } = Layout;

export function Root(props){
    const location=useLocation();
    return (
        <LoginProvider>
            <Layout className="layout">
                <Header style={{ position: 'sticky', top: 0, zIndex: 16, width: '100%' }}>
                    <div className="logo" />
                    <Menu 
                        theme="dark" 
                        mode="horizontal" 
                        defaultSelectedKeys={[location.pathname]} 
                    >  
                        <Menu.Item key="/">
                            <NavLink to="/">图书列表</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/cart">
                            <NavLink to="/cart">购物车</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/orders">
                            <NavLink to="/orders">订单</NavLink>
                        </Menu.Item>
                        <Menu.Item key="/profile">
                            <NavLink to="/profile">个人信息</NavLink>
                        </Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <div  className="site-layout-content">
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Bookstore Copyright 2023 Zhang Zhuyue</Footer>
            </Layout>
        </LoginProvider>
        
    );
}
