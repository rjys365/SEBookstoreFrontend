import { render } from "@testing-library/react";
import { List } from "antd";
import React, { useEffect } from "react";
import { CartInfo } from "../component/CartInfo";
import { BOOKS, CARTITEM } from "../const/book-const";
import { LoginContext } from "../service/LoginContext";
import { Navigate } from "react-router-dom";
import { loadCart, saveCart } from "../service/CartLocalStorage";


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
    
    if(!login.token){
        return <Navigate to={'/login?back='+encodeURIComponent('/cart')}/>;
    }
    if(cart===null)return (
        <div>
            <h1>Loading</h1>
        </div>
    )
    return (
        <div>
            <CartInfo cart={cart} onDelete={handleDelete} onPlus={handlePlus} onMinus={handleMinus}/>
        </div>
    );
}