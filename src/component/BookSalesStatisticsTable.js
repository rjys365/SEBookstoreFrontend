import {Link} from "react-router-dom";
import {Table} from "antd";

export function BookSalesStatisticsTable(props){
    const columns=[
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: (text,item)=>{
                return <Link to={'/books/'+item.bookId.toString()}>{text}</Link>
            }
        },
        {
            title: '销量',
            dataIndex: 'totalCount',
            key: 'totalCount',
        }
    ]
    return (
        <Table columns={columns} dataSource={props.data} pagination={null}/>
    )
}
