import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
export function SearchBar(props){
    const handleChange = (e) => {
        props.onChange(e.target.value);
    };
    const handleSearch = (e) => {
        props.onSearch(e);
    };
    return (
        <div id='search-bar'>
            <Search placeholder="input search text" onChange={handleChange} onSearch={handleSearch} value={props.value} enterButton />
        </div>
    );
}