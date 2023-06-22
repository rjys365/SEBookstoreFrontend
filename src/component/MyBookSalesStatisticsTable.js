import {Link} from "react-router-dom";
import {Table} from "antd";

export function MyBookSalesStatisticsTable(props){
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
            title: '购买件数',
            dataIndex: 'totalCount',
            key: 'totalCount',
        }
    ]
    return (
        <Table columns={columns} dataSource={props.data} pagination={null}/>
    )
}
