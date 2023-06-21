import {Button, Descriptions, Empty, Image, message, Spin} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {BOOKS} from "../const/book-const";
import "./BookDetails.css"
import {LoginContext} from "../service/LoginContext";
import {addCartItem} from "../service/CartService";
import {MessageContext} from "../service/MessageContext";
import {getBookById} from "../service/BookService";

export function BookDetails() {
    let {id} = useParams();
    id = Number(id);
    //const navigate=useNavigate();
    const {login} = React.useContext(LoginContext);
    const [navigatingToCart, setNavigatingToCart] = useState(false);
    const [navigatingToOrder, setNavigatingToOrder] = useState(0);
    const [book, setBook] = useState(undefined);

    const messageApi = useContext(MessageContext);
    useEffect(()=>{
        const op=async ()=>{
            try{
                const book=await getBookById(id);
                setBook(book);
            }
            catch(e){
                setBook(null);
            }
        };
        op();
    },[]);
    const postOrder = () => {
        const order = {id, quantity: 1};
        const orderData = JSON.stringify(order);
        fetch('http://localhost:8080/orders/?userId=' + login.userId.toString() + '&from=item', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: orderData
        }).then(async (response) => {
            if (response.ok) {
                const order = await response.json();
                // console.log(order);
                setNavigatingToOrder(order.id);
            }
        });
    }
    const handleBuy = () => {
        postOrder();
    }
    const handleAdd = () => {
        const op = async () => {
            const cart = await addCartItem(login.userId, id, 1);
            if (cart) messageApi.success('成功加入购物车');
        };
        op();
    }
    if (login === undefined||book===undefined) return <Spin size="large"/>
    if (!login.token) {
        return <Navigate to={"/login?back=" + encodeURIComponent('/book/' + id)}/>;
    }
    if (!book) return <Empty/>;
    if (navigatingToCart) return <Navigate to="/cart"/>;
    if (navigatingToOrder) return <Navigate to={"/orders/" + navigatingToOrder}/>;// navigate to SPECIFIC order page
    return (
        <div className="book-detail-wrapper">
            <div className="book-image"><Image src={book.image} alt={book.title} width={300}/></div>

            <div className="descriptions">
                <Descriptions bordered="yes">
                    <Descriptions.Item label="标题" span={3}>{book.title}</Descriptions.Item>
                    <Descriptions.Item label="作者" span={3}>{book.author}</Descriptions.Item>
                    <Descriptions.Item label="出版社" span={3}>{book.publisher}</Descriptions.Item>
                    <Descriptions.Item className="price" label="价格" span={3}>{'￥' + book.price}</Descriptions.Item>
                    <Descriptions.Item label="状态" span={3}>{book.stock === 0 ? "无货" : "有货"}</Descriptions.Item>
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
