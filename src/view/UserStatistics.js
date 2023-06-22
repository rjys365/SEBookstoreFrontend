import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../service/LoginContext";
import {MessageContext} from "../service/MessageContext";
import {getBookStatisticsByTimeRange, getUserStatisticsByTimeRange} from "../service/StatisticsService";
import {Button, DatePicker, Empty, Spin} from "antd";
import {Navigate} from "react-router-dom";
import {UserStatisticsTable} from "../component/UserStatisticsTable";

export function UserStatistics(){
    const {login} = useContext(LoginContext);
    const messageApi = useContext(MessageContext);
    const [userStatistics, setUserStatistics] = useState(null);
    const [statisticsRequest, setStatisticsRequest] = useState(null);
    const [timeRange, setTimeRange] = useState(null);
    const handleSetRange = (value, dateString) => {
        if (!value[0] || !value[1]) return;
        setTimeRange([value[0].format('YYYY-MM-DDTHH:mm:ss'), value[1].format('YYYY-MM-DDTHH:mm:ss')]);
    }
    const handleQuery = () => {
        if (!timeRange) {
            messageApi.warning('请设置时间范围');
            return;
        }
        setStatisticsRequest({timeRange});
    }
    useEffect(() => {
        if (!statisticsRequest) return;
        const op = async () => {
            const data = await getUserStatisticsByTimeRange(statisticsRequest.timeRange);
            setUserStatistics(data);
            setStatisticsRequest(null);
        };
        op();
    }, [statisticsRequest]);
    if (login === undefined) {
        return <Spin size='Large'/>
    }
    if (login===null){
        return <Navigate to={'/login?back='+encodeURIComponent('/bookSalesStatistics')}/>
    }
    if (login.role!==2){
        return <Empty description="您不是管理员，不能使用此功能"/>
    }
    return (
        <div className="book-sales-statistics-view">
            <div className="book-sales-statistics-range-selection">
                <DatePicker.RangePicker
                    showTime={{
                        format: 'HH:mm:ss',
                    }}
                    format="YYYY-MM-DD HH:mm:ss"
                    onOk={handleSetRange}
                />
                <Button onClick={handleQuery}>查询</Button>
            </div>
            <div className="book-sales-statistics-data-area">
                {statisticsRequest ? <Spin size="large"/> : <UserStatisticsTable data={userStatistics}/>}
            </div>
        </div>
    )
}