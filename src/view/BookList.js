import React, {useContext, useEffect, useState} from 'react';
import { SearchBar } from '../component/SearchBar';
import {Col, List, Row, Spin} from 'antd';
//import './BookList.css';

import { BookCard } from '../component/BookCard';
import { BookCarousel } from '../component/BookCarousel';
import { LoginContext } from '../service/LoginContext';
import { Link, Navigate } from 'react-router-dom';
import { fetchBookList } from '../service/FetchBookList';

export function BookList() {
    // const [login,setLogin]=useState(undefined);
    const {login}=useContext(LoginContext);

    const [searchText, setSearchText] = React.useState('');
    const [filterText, setFilterText] = React.useState('');
    const [books, setBooks] = React.useState(null);
    const handleSearchChange=(str)=>{
        setSearchText(str);
    }
    const handleSearch=(str)=>{
        setFilterText(str);
    }
    useEffect(()=>{
        const set=async ()=>{setBooks(await fetchBookList());}
        set();
    },[]);
    useEffect(()=>{
        const newLogin=localStorage.getItem('login');
    })

    if(login===undefined){
        return <Spin size='large'/>
    }
    if(login===null||!login.token){
        //return <div>请登录</div>;
        return <Navigate to="/login"/>;
    }
    
    if(books===null){
        return <div>loading</div>;
    }
    const filteredBooks=filterText===''?books:books.filter((book)=>{return book.title.includes(filterText)||book.author.includes(filterText)});
    return (
        <div id='view-frame'>
            {login.role===2?<div><Link to="/userManagement">管理用户</Link></div>:null}
            <p>
                <BookCarousel/>
            </p>
            
            
            <div>
                <SearchBar onChange={handleSearchChange} value={searchText} onSearch={handleSearch}/>
                <List
                    grid={{gutter: 10, column: 4}}
                    dataSource={filteredBooks}
                    

                    renderItem={item => (
                        <List.Item>
                            <BookCard info={item} />
                        </List.Item>
                    )}
                />
            </div>
            
            
        </div>
    );
}