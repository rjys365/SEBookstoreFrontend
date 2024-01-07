import React, {useState} from "react";
import {SearchBar} from "../component/SearchBar";
import {getWordCountByCategories} from "../service/WordCountService";

export function WordCount() {
    const [result, setResult] = useState(undefined);
    const [text, setText] = useState('');
    const handleSearchChange = (str) => {
        setText(str);
    };
    const handleWordCount = (str) => {
        const set = async () => {
            const data = await getWordCountByCategories(str);
            setResult(data);
        }
        set();
    }
    const resultShow = (result) ? (<div>
        {Object.entries(result).map(([group, counts]) => (
            <div key={group}>
                <h2>{group}</h2>
                <ul>
                    {Object.entries(counts).map(([word, count]) => (
                        <li key={word}>
                            {word}: {count}
                        </li>
                    ))}
                </ul>
            </div>
        ))}
    </div>) : null;
    return (<div>
            <div>
                <SearchBar onChange={handleSearchChange} value={text} onSearch={handleWordCount}/>
            </div>
            {resultShow}
        </div>
    );
}