import React, {useContext, useEffect, useState} from "react";
import './Root.css';
import {Breadcrumb, Layout, Menu, theme, SubMenu, message} from 'antd';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {LoginContext, LoginProvider} from "../service/LoginContext";
import {MessageProvider} from "../service/MessageContext";

const {Header, Content, Footer} = Layout;

export function Root(props) {
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    const [selectedKeys, setSelectedKeys] = useState([]);
    const menuItemPathKeywords = ['/', 'cart', 'orders', 'profile'];
    const pathname = location.pathname;
    const parsePathname = (pathname) => {
        let newSelectedKeys = [];
        if (pathname === '/') newSelectedKeys = ['0'];
        else for (let i = 1; i < menuItemPathKeywords.length; i++) {
            if (pathname.includes(menuItemPathKeywords[i])) newSelectedKeys.push(i.toString());
        }
        setSelectedKeys(newSelectedKeys);
    }
    useEffect(() => {
        parsePathname(pathname);
    }, [pathname]);
    return (
        <MessageProvider>
            <LoginProvider>
                <Layout className="layout">
                    <Header style={{position: 'sticky', top: 0, zIndex: 16, width: '100%'}}>
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={selectedKeys}
                        >
                            <Menu.Item key="0">
                                <NavLink to="/">图书列表</NavLink>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <NavLink to="/cart">购物车</NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to="/orders">订单</NavLink>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <NavLink to="/profile">个人信息</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Header>
                    <Content style={{padding: '0 50px'}}>
                        {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                    </Breadcrumb> */}
                        <div className="site-layout-content">
                            <Outlet/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>Bookstore Copyright 2023 Zhang Zhuyue</Footer>
                </Layout>
            </LoginProvider>
        </MessageProvider>
    );
}
