import {List, Spin} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {LoginContext} from "../service/LoginContext";
import {Link, Navigate} from "react-router-dom";

export function Orders() {
    const {login} = useContext(LoginContext);
    const [orders, setOrders] = useState(null);
    const loadOrders = () => {
        if (!login || !login.token) return;
        const load = async () => {
            const response = await fetch('http://localhost:8080/orders/?userId=' + login.userId);
            const json = await response.json();
            setOrders(json);
        };
        if (login.token) load();
    }
    useEffect(() => {
        loadOrders()
    }, [login]);
    if (login === undefined) return <Spin size="large"/>
    if (!login.token) return <Navigate to={'/login?back=' + encodeURIComponent('/orders')}/>;
    if (orders === null) return (
        <div>
            <Spin size="large"/>
        </div>
    )
    return (
        <div>
            <h1>订单列表</h1>
            <List
                itemLayout="horizontal"
                dataSource={orders}
                renderItem={item => (
                    <List.Item key={'order-' + item.id}>
                        <List.Item.Meta
                            title={<div><span>订单号: </span><span><Link
                                to={'/orders/' + item.id}>{item.id}</Link></span></div>}
                            description={<div>
                                <div><span>订单总价: ￥</span><span>{item.totalPrice}</span></div>
                                <div>{item.firstItemTitle + (item.itemCount === 1 ? '' : '等' + item.itemCount + '件商品')}</div>
                            </div>}
                        />
                    </List.Item>
                )}
            />
        </div>

    )
}