import React, {useContext, useEffect, useRef, useState} from "react";
import {Button, Empty, Form, Input, Spin, Table} from "antd";
import {MessageContext} from "../service/MessageContext";
import {LoginContext} from "../service/LoginContext";
import {useNavigate} from "react-router-dom";
import {addCartItem, setCartItem} from "../service/CartService";
import {deleteBook, patchBook, postBook} from "../service/BookService";
import {BACKEND_SERVER_ENDPOINT} from "../const/book-const";
import {fetchBookList} from "../service/FetchBookList";


const EditableContext = React.createContext(null);

const EditableRow = ({index, ...props}) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};

const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);

    useEffect(() => {
        if (editing) {
            inputRef.current.focus();
        }
    }, [editing]);

    const toggleEdit = () => {
        setEditing(!editing);
        form.setFieldsValue({[dataIndex]: record[dataIndex]});
    };

    const save = async () => {
        try {
            const values = await form.validateFields();
            toggleEdit();
            console.log(JSON.stringify({...record, ...values}));
            handleSave({...record, ...values});
        } catch (errInfo) {
            console.log('Save failed:', errInfo);
        }
    };

    let childNode = children;

    if (editable) {
        childNode = editing ? (
            <Form.Item
                style={{margin: 0}}
                name={dataIndex}
                rules={[
                    {
                        required: true,
                        message: `请输入${title}`,
                    },

                ]}
            >
                <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
            </Form.Item>
        ) : (
            <div className="editable-cell-value-wrap" style={{paddingRight: 24}} onClick={toggleEdit}>
                {children}
            </div>
        );
    }

    return <td {...restProps}>{childNode}</td>;
};


export function BookManagement(){
    const messageApi = useContext(MessageContext);
    const [form] = Form.useForm();
    const [books, setBooks] = useState(null);
    const [navigatingToOrder, setNavigatingToOrder] = useState(0);
    const {login} = React.useContext(LoginContext);
    const [operation, setOperation] = useState(null);
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const navigate = useNavigate();

    const handleSave = (row) => {
        console.log(JSON.stringify(row));
        const newData = [...books];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setBooks(newData);
        setOperation({...row, bookId: row.id, book:row});
    };

    const handleDelete=(bookId)=>{
        console.log(bookId);
        const op=async(bookId)=>{
            try {
                const response = await deleteBook(bookId);
                if(!response)messageApi.error('删除失败');
                setBooks(null);
            }
            catch (e) {
                messageApi.error('删除失败');
                setBooks(null);
            }
        };
        op(bookId);
    }

    const handleNew=()=>{
        const op=async() =>{
            try {
                const response = await postBook({
                    id:undefined,
                    title:'标题',
                    author:'作者',
                    publisher:'出版社',
                    price:'1.0',
                    stock:'1',
                    introduction:'介绍',
                    image:'图片链接'
                });
                setBooks(null);
            }
            catch (e) {
                messageApi.error('删除失败');
                setBooks(null);
            }
        };
        op();
    }

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    useEffect(()=>{
        if(books===null){
            const op=async ()=>{
                setBooks(await fetchBookList());
            }
            op();
        }
    },[books]);

    useEffect(() => {
        if (!login) return;
        if (operation) {
            let op;
            if (operation.book.id) op = async () => {
                try{
                    const newBooks = await patchBook(operation.book);
                    console.log(JSON.stringify(newBooks));
                    setBooks(null);
                }
                catch (e) {
                    messageApi.error('修改失败');
                    setBooks(null);
                }
                setOperation(null);
            };
            else op = async () => {
                try{
                    const newBooks = await postBook(operation.book);
                    setBooks(null);
                }
                catch (e) {
                    messageApi.error('修改失败');
                    setBooks(null);
                }
                setOperation(null);
            };
            op();
        }
    }, [operation, login]);

    const defaultColumns=[
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '图片链接',
            dataIndex: 'image',
            key: 'image',
            editable: true,
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            editable: true,
        },
        {
            title: '出版社',
            dataIndex: 'publisher',
            key: 'publisher',
            editable: true,
        },
        {
            title: '库存',
            dataIndex: 'image',
            key: 'image',
            editable: true,
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            editable: true,
        },
        {
            title:'简介',
            dataIndex: 'introduction',
            key:'introduction',
            editable: true,
        },
        {
            title:'操作',
            key:'operation',
            render:(_,item)=>{
                return (
                    <Button danger onClick={()=>{handleDelete(item.id)}}>删除</Button>
                )
            }
        }
    ];

    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave,
            }),
        };
    });

    if (login === undefined || operation||books===null) {
        return <Spin size="large"/>
    }

    if (login===null||login.role!==2){
        return <Empty/>
    }
    console.log(JSON.stringify(books));
    return (
        <div className="book-manage">
            <Table
                columns={columns}
                components={components}
                rowClassName={() => 'editable-row'}
                pagination={false}
                dataSource={books}/>
            <Button onClick={handleNew} >添加图书</Button>
        </div>
    )

}