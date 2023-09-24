import React, {useContext, useEffect, useState} from "react";
import './Root.css';
import {Breadcrumb, Layout, Menu, theme, SubMenu, message, Spin} from 'antd';
import {NavLink, Outlet, useLocation} from "react-router-dom";
import {LoginContext, LoginProvider} from "../service/LoginContext";
import {MessageProvider} from "../service/MessageContext";
import {getLocalStorageLogin} from "../service/LoginService";

const {Header, Content, Footer} = Layout;

export function Root(props) {
    const location = useLocation();
    const [messageApi, contextHolder] = message.useMessage();
    const [login, setLogin] = useState(undefined);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const menuItemPathKeywords = ['/', 'cart', 'orders', 'profile', 'myStatistics'];
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
        const newLogin = getLocalStorageLogin();
        setLogin(newLogin);
    }, [pathname]);
    useEffect(() => {
        const newLogin = getLocalStorageLogin();
        setLogin(newLogin);
    }, []);
    if (login === undefined) return <Spin></Spin>
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
                            <Menu.Item key="4">
                                <NavLink to="/myStatistics">我的统计</NavLink>
                            </Menu.Item>
                            {
                                login ? (
                                    <Menu.Item key="5">
                                        <NavLink to="/logout">注销</NavLink>
                                    </Menu.Item>
                                ) : null
                            }
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
