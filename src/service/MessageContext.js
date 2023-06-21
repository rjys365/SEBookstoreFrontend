import {createContext} from "react";
import {message} from "antd";

export const MessageContext = createContext(null);

export const MessageProvider = ({children}) => {
    const [messageApi, contextHolder] = message.useMessage();
    return (
        <>
            {contextHolder}
            <MessageContext.Provider value={messageApi}>
                {children}
            </MessageContext.Provider>
        </>
    );
}