import React from 'react';
import { Card } from 'antd';

import {Link} from 'react-router-dom'

const { Meta } = Card;

export class BookCard extends React.Component{


    render() {

        const {info} = this.props;

        return (
            <Link to={{
                pathname: '/book/'+info.id,}}
                // target="_blank"
            >
            <Card
                hoverable
                style={{width: 181}}
                cover={<img alt="image" src={info.image} className={"bookImg"}/>}
                //onClick={this.showBookDetails.bind(this, info.bookId)}
            >
                <Meta title={info.title} description={'¥' + info.price}/>
            </Card>
            </Link>
        );
    }

}