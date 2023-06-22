import {useContext, useEffect, useState} from "react";
import {LoginContext} from "../service/LoginContext";
import {MessageContext} from "../service/MessageContext";
import {
    getBookStatisticsByTimeRangeAndUserId,
    getUserStatisticsByTimeRangeAndUserId
} from "../service/StatisticsService";
import {Button, DatePicker, Empty, Spin} from "antd";
import {Navigate} from "react-router-dom";
import {MyBookSalesStatisticsTable} from "../component/MyBookSalesStatisticsTable";

export function MyStatistics(){
    const {login} = useContext(LoginContext);
    const messageApi = useContext(MessageContext);
    const [myBookSalesStatistics,setMyBookSalesStatistics]= useState(null);
    const [myUserStatistics, setMyUserStatistics] = useState(null);
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
        const op1 = async () => {
            try{
                const data = await getUserStatisticsByTimeRangeAndUserId(statisticsRequest.timeRange,login.userId);
                setMyUserStatistics(data);
            }
            catch(e){
                messageApi.warning('此时段未有购买数据');
                setMyUserStatistics(null);
            }

        };
        const op2 = async ()=>{
            const data = await getBookStatisticsByTimeRangeAndUserId(statisticsRequest.timeRange,login.userId);
            setMyBookSalesStatistics(data);
        };
        const op=async ()=>{
            await Promise.all([op1(),op2()]);
            setStatisticsRequest(null);
        }
        op();
    }, [statisticsRequest]);
    if (login === undefined) {
        return <Spin size='Large'/>
    }
    if (login===null){
        return <Navigate to={'/login?back='+encodeURIComponent('/bookSalesStatistics')}/>
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
                <div>
                    {myUserStatistics?('购书'+myUserStatistics.totalBooks.toString()+'本，花费'+myUserStatistics.totalAmount.toString()+'元'):null}
                </div>
                {statisticsRequest ? <Spin size="large"/> : <MyBookSalesStatisticsTable data={myBookSalesStatistics}/>}
            </div>
        </div>
    )
}