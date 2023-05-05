import { render } from "@testing-library/react";
import { Button, List } from "antd";
import React, { useEffect, useState } from "react";
import { CartInfo } from "../component/CartInfo";
import { BOOKS, CARTITEM } from "../const/book-const";
import { LoginContext } from "../service/LoginContext";
import { Navigate } from "react-router-dom";
import { loadCart, saveCart } from "../service/CartLocalStorage";
import { Order } from "../util/Order";


export function Cart(){
    const [cart, setCart] = React.useState(
        ()=>{
            let newCart=JSON.parse(localStorage.getItem('cart'));
            if(newCart===null){
                const newCart=[];
                localStorage.setItem('cart',JSON.stringify(newCart));
                return newCart;
            }
            return newCart;
        });
    const [navigatingToOrder,setNavigatingToOrder]=useState(0);
    const login=React.useContext(LoginContext);
    
    
    useEffect(()=>{saveCart(cart)},[cart]);
    const handleDelete=(idx)=>{
        setCart(prev=>prev.filter((item,tidx)=>tidx!==idx));
    }
    const handlePlus=(idx)=>{
        setCart(prev=>prev.map((item,tidx)=>tidx===idx?{...item,quantity:item.quantity+1}:item));
    }
    const handleMinus=(idx)=>{
        setCart(prev=>{
            if(prev[idx].quantity===1){
                return prev.filter((item,tidx)=>tidx!==idx);
            }
            return prev.map((item,tidx)=>tidx===idx?{...item,quantity:item.quantity-1}:item);
        });
    }
    const handleBuy=()=>{
        const orderData=JSON.stringify(new Order(undefined,cart.map((item)=>{return {id:item.id,count:item.quantity}}),login.userId));
        setCart([]);
        fetch('http://localhost:8080/orders/',{
            method:'POST',
            headers:{
                'Content-type': 'application/json'
            },
            body:orderData
        }).then(async (response)=>{
            if(response.ok){
                const order=await response.json();
                setNavigatingToOrder(order.id);
            }
        });
    }
    
    if(!login.token){
        return <Navigate to={'/login?back='+encodeURIComponent('/cart')}/>;
    }
    if(navigatingToOrder!==0){
        return <Navigate to={'/orders/'+navigatingToOrder}/>;
    }
    if(cart===null)return (
        <div>
            <h1>Loading</h1>
        </div>
    )
    return (
        <div>
            <CartInfo cart={cart} onDelete={handleDelete} onPlus={handlePlus} onMinus={handleMinus}/>
            <Button onClick={handleBuy}>提交订单</Button>
        </div>
    );
}