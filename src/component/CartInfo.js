import { List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { BOOKS } from "../const/book-const";
export function CartInfo(props){
    const {cart,onDelete,onPlus,onMinus} = props;
    const books=BOOKS;
    //console.log('rendering');
    let cartInfo=[];// maybe change into state after async fetch implemented
    for(let i=0;i<cart.length;i++){
        const book=books.find(book=>book.id===cart[i].id);
        cartInfo.push({
            id: cart[i].id,
            title: book.title,
            image: book.image,
            quantity: cart[i].quantity,
            price: book.price,
            totalPrice: book.price*cart[i].quantity
        });
    }
    let dispInfo=[<List.Item >
        <span style={{width:'10%'}}>封面</span>
        <span style={{width:'18%',overflow:'hidden'}}>标题</span>
        <span style={{width:'18%',overflow:'hidden'}}>件数</span>
        <span style={{width:'18%',overflow:'hidden'}}>价格</span>
        <span style={{width:'18%',overflow:'hidden'}}>总价</span>
        <span>操作</span>
    </List.Item>];
    
    for(let i=0;i<cartInfo.length;i++){
        dispInfo.push(
            <List.Item key={"cart-"+cart[i].id} id={"cart-"+cart[i].id}>
                <span style={{width:'10%'}}><img style={{maxHeight:40, maxWidth:'100%'}} src={cartInfo[i].image} alt="book"/></span>
                <span style={{width:'18%',overflow:'hidden'}}><Link to={'/book/'+cartInfo[i].id}>{cartInfo[i].title}</Link></span>
                <span style={{width:'18%',overflow:'hidden'}}>{cartInfo[i].quantity}</span>
                <span style={{width:'18%',overflow:'hidden'}}>{'￥'+cartInfo[i].price}</span>
                <span style={{width:'18%',overflow:'hidden'}}>{'￥'+cartInfo[i].totalPrice}</span>
                
                <span >
                    <button onClick={()=>onPlus(i)}>+</button>
                    <button onClick={()=>onMinus(i)}>-</button>
                    <button onClick={()=>onDelete(i)}>删除</button>
                </span>
            </List.Item>
        )
    }
    return (
        <div>
            <List rowKey="id">
                {dispInfo}
            </List>
        </div>
    );
}