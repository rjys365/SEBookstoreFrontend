import {SearchBar} from "../component/SearchBar";
import {List} from "antd";
import {BookCard} from "../component/BookCard";
import React, {useState} from "react";
import {getTagRelatedBooks} from "../service/BookService";

export function BookTagSearch(){
    const [filteredBooks,setFilteredBooks] = useState([]);
    const [searchText,setSearchText] = useState('');
    const handleSearchChange = (str) => {
        setSearchText(str);
    }
    const handleSearch = (str) => {
        const search = async ()=> {
            const response = await getTagRelatedBooks(str);
            setFilteredBooks(response);
        };
        search();
    }

    return (<div>
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
    </div>);
}
