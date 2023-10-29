import React, {useContext, useEffect, useState} from 'react';
import {SearchBar} from '../component/SearchBar';
import {List, Spin} from 'antd';
//import './BookList.css';

import {BookCard} from '../component/BookCard';
import {BookCarousel} from '../component/BookCarousel';
import {LoginContext} from '../service/LoginContext';
import {Link, Navigate} from 'react-router-dom';
import {fetchBookList} from '../service/FetchBookList';
import {searchBooksByAuthor} from "../service/SearchBooksByAuthor";

export function BookAuthorSearch() {
    // const [login,setLogin]=useState(undefined);
    const {login} = useContext(LoginContext);

    const [searchText, setSearchText] = React.useState('');
    const [filterText, setFilterText] = React.useState('');
    const [books, setBooks] = React.useState(null);
    const handleSearchChange = (str) => {
        setSearchText(str);
    }
    const handleSearch = (str) => {
        setFilterText(str);
        setBooks(null);
    }
    useEffect(() => {
        if(books===null){
            const set = async () => {
                const newBooks=(filterText===''?(await fetchBookList()):(await searchBooksByAuthor(filterText)));
                setBooks(newBooks);
            }
            set();
        }
    }, [books]);
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
    const filteredBooks = books;
    return (
        <div id='view-frame'>
            <div>
                <SearchBar onChange={handleSearchChange} value={searchText} onSearch={handleSearch}/>
                <List
                    grid={{gutter: 10, column: 4}}
                    dataSource={filteredBooks}


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