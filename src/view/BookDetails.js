import { Button, Descriptions, Empty, Image } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { BOOKS } from "../const/book-const";
import "./BookDetails.css"
import { saveCart } from "../service/CartLocalStorage";
export function BookDetails(){
    let {id}=useParams();
    id=Number(id);
    //const navigate=useNavigate();
    const [navigatingToCart,setNavigatingToCart]=useState(false);
    const [cart, setCart] = React.useState(
        ()=>{
            let newCart=JSON.parse(localStorage.getItem('cart'));
            if(newCart===null){
                const newCart=[];
                localStorage.setItem('cart',JSON.parse(newCart));
                return newCart;
            }
            return newCart;
        });
    
    useEffect(()=>{saveCart(cart)},[cart]);
    //console.log(id);
    const book=BOOKS.find((book)=>{return book.id===id});
    const handleBuy=()=>{
        handleAdd();
        setNavigatingToCart(true);
    }
    const handleAdd=()=>{
        let newCart=cart.slice();
        //console.log(newCart);
        const idx=newCart.findIndex((item)=>item.id===id);
        if(idx===-1){
            newCart.push({id:id,quantity:1});
        }else{
            newCart[idx].quantity++;
        }
        setCart(newCart);
    }
    if(!book)return <Empty />;
    if(navigatingToCart)return <Navigate to="/cart"/>;
    return (
        <div className="book-detail-wrapper">
            <div className="book-image"><Image src={book.image} alt={book.title} width={300} /></div>
            
            <div className="descriptions" >
                <Descriptions bordered="yes">
                    <Descriptions.Item label="标题" span={3} >{book.title}</Descriptions.Item>
                    <Descriptions.Item label="作者" span={3}>{book.author}</Descriptions.Item>
                    <Descriptions.Item label="出版社" span={3}>{book.publisher}</Descriptions.Item>
                    <Descriptions.Item className="price" label="价格" span={3}>{'￥'+book.price}</Descriptions.Item>
                    <Descriptions.Item label="状态" span={3}>{book.stock===0?"无货":"有货"}</Descriptions.Item>
                    <Descriptions.Item label="简介" span={3}>{book.introduction}</Descriptions.Item>
                    <Descriptions.Item label="操作" span={3}>
                        <Button type="primary" onClick={handleBuy}>立即购买</Button>
                        <Button onClick={handleAdd}>加入购物车</Button>
                    </Descriptions.Item>
                </Descriptions>
            </div>
            

        </div>
    );
}