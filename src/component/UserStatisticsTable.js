import {Link} from "react-router-dom";
import {Table} from "antd";

export function UserStatisticsTable(props){
    const columns=[
        {
            title: '用户id',
            dataIndex: 'userId',
            key: 'userId'
        },
        {
            title: '购买件数',
            dataIndex: 'totalBooks',
            key: 'totalBooks',
        },
        {
            title: '总消费额',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
        }
    ]
    return (
        <Table columns={columns} dataSource={props.data} pagination={null}/>
    )
}
