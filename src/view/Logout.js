import {useEffect, useState} from "react";
import {Button, Spin} from "antd";

export function Logout() {
    const [loggingOut,setLoggingOut]=useState(false);
    const [logoutDto, setLogoutDto] = useState(undefined);
    useEffect(() => {
        if (logoutDto === undefined&&loggingOut) {
            fetch('http://localhost:8080/login/', {
                method: 'DELETE',
                credentials: 'include'
            }).then(
                response => {
                    if (response.ok) return response.json();
                    else localStorage.removeItem('login');
                },
                ()=>{
                    setLogoutDto(null);
                }
            ).then((json) => {
                localStorage.removeItem('login');
                setLogoutDto(json);
            });
        }
    }, [loggingOut,logoutDto]);
    useEffect(() => {
        // alert(JSON.stringify(logoutDto));
        if (logoutDto !== undefined) {
            localStorage.removeItem('login');
        }
    }, [logoutDto]);

    if (logoutDto === undefined) return <Button onClick={()=>{setLoggingOut(true)}}>确认注销</Button>;
    if (!logoutDto) return <div>注销失败</div>;
    return <div>{"注销成功，距离登录毫秒数" + logoutDto.millisSinceLogin}</div>;
}
