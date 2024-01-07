import React, {useContext, useEffect, useState} from 'react';
import {SearchBar} from '../component/SearchBar';
import {List, Spin} from 'antd';
//import './BookList.css';

import {BookCard} from '../component/BookCard';
import {BookCarousel} from '../component/BookCarousel';
import {LoginContext} from '../service/LoginContext';
import {Link, Navigate} from 'react-router-dom';
import {fetchBookList} from '../service/FetchBookList';
import {getBookByTitleContainingGraphQL, getBooksGraphQL} from "../service/BookGraphQLService";

export function BookList() {
    // const [login,setLogin]=useState(undefined);
    const {login} = useContext(LoginContext);

    const [searchText, setSearchText] = React.useState('');
    // const [filterText, setFilterText] = React.useState('');
    const [books, setBooks] = React.useState(null);
    const handleSearchChange = (str) => {
        setSearchText(str);
    }
    const handleSearch = (str) => {
        const set = async () => {
            setBooks(await getBookByTitleContainingGraphQL(str));
        }
        set();
    }
    useEffect(() => {
        const set = async () => {
            setBooks(await getBooksGraphQL());
        }
        set();
    }, []);
    useEffect(() => {
        const newLogin = localStorage.getItem('login');
    })

    if (login === undefined || books === null) {
        return <Spin size='large'/>
    }
    if (login === null || !login.token) {
        //return <div>请登录</div>;
        return <Navigate to="/login"/>;
    }
    // const filteredBooks = filterText === '' ? books : books.filter((book) => {
    //     return book.title.includes(filterText) || book.author.includes(filterText)
    // });
    return (
        <div id='view-frame'>
            {login.role === 2 ? (
                <div>
                    <Link to="/userManagement">管理用户</Link>
                    <span> </span>
                    <Link to='/bookSalesStatistics'>图书销量排行</Link>
                    <span> </span>
                    <Link to='/userStatistics'>用户购买统计</Link>
                    <span> </span>
                    <Link to='bookManagement'>管理图书</Link>
                    <span> </span>
                    <Link to='wordCount'>词频统计</Link>
                </div>
            ) : null}
            <p>
                <BookCarousel/>
            </p>


            <div>
                <SearchBar onChange={handleSearchChange} value={searchText} onSearch={handleSearch}/>
                <List
                    grid={{gutter: 10, column: 4}}
                    dataSource={books}


                    renderItem={item => (
                        <List.Item>
                            <BookCard info={item}/>
                        </List.Item>
                    )}
                />
            </div>


        </div>
    );
}