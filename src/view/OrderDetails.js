import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../service/LoginContext";
import { Link, Navigate, useParams } from "react-router-dom";
import {Empty, List, Spin} from "antd";


export function OrderDetails(){
    const {login}=useContext(LoginContext);
    const [order,setOrder]=useState(null);
    const {id}=useParams();
    const idNum=Number(id);
    useEffect(()=>{
        if(!login||!login.token)return;
        const load=async ()=>{
        const response=await fetch('http://localhost:8080/orders/'+idNum);
        const json=await response.json();
        setOrder(json);
    };
    load();},[idNum,login]);
    if (login === undefined) return <Spin size="large"/>;
    if(!login.token)return <Navigate to={'/login?back='+encodeURIComponent('/orders/'+id)}/>;
    if(order===null)return (
        <div>
            <Spin size="large" tip="订单信息加载中"/>
        </div>
    )
    return (
        <div>
            <h1>订单详情</h1>
            <div>
                <div><span>订单号: </span><span>{order.id}</span></div>
                <div><span>总金额: ￥</span><span>{order.digest.totalPrice}</span></div>
                <List
                    itemLayout="horizontal"
                    dataSource={order.items}
                    renderItem={item=>(
                        <List.Item key={'item-'+item.id}>
                            <List.Item.Meta
                                title={<div><Link to={'/book/'+item.id}>{item.title}</Link></div>}
                                description={<div>
                                    <div><span>单价: ￥</span><span>{item.price}</span></div>
                                    <div><span>数量: </span><span>{item.count}</span></div>
                                    <div><span>小计: ￥</span><span>{item.subTotal}</span></div>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}
