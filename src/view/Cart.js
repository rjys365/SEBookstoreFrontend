import {Button, Form, Image, Input, Spin, Table} from "antd";
import React, {useContext, useEffect, useRef, useState} from "react";
import {LoginContext} from "../service/LoginContext";
import {Navigate, useNavigate} from "react-router-dom";
import {addCartItem, createOrderFromCart, getCart, setCartItem} from "../service/CartService";
import {MessageContext} from "../service/MessageContext";

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
                    () => ({
                        validator(_, value) {
                            if (value === undefined || value === null || value === '') {
                                return Promise.resolve();
                            }

                            const nonNegativeIntegerRegEx = /^\d+$/;
                            if (!nonNegativeIntegerRegEx.test(value)) {
                                return Promise.reject(new Error('件数应为非负整数'));
                            }

                            return Promise.resolve();
                        },
                    })
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

export function Cart() {
    const messageApi = useContext(MessageContext);
    const [form] = Form.useForm();
    const [cart, setCart] = useState(null);
    const [navigatingToOrder, setNavigatingToOrder] = useState(0);
    const {login} = React.useContext(LoginContext);
    const [operation, setOperation] = useState(null);
    const [submittingOrder, setSubmittingOrder] = useState(false);
    const navigate = useNavigate();
    const handleDeleteItem = (bookId) => {
        setOperation({bookId, quantity: 0});
    }
    const handleAddItem = (bookId) => {
        setOperation({bookId, quantity: 1, add: true})
    }
    const handleMinusItem = (bookId) => {
        setOperation({bookId, quantity: -1, add: true})
    }
    const handleSubmit = () => {
        setSubmittingOrder(true);
    }
    const handleSave = (row) => {
        console.log(JSON.stringify(row));
        const newData = [...cart];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setCart(newData);
        setOperation({...row, bookId: row.id, quantity: row.quantity});
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    useEffect(() => {
        if (!login) return;
        if (operation) {
            let op;
            if (operation.add) op = async () => {
                const newCart = await addCartItem(login.userId, operation.bookId, operation.quantity);
                setCart(newCart);
                setOperation(null);
            };
            else op = async () => {
                const newCart = await setCartItem(login.userId, operation.bookId, operation.quantity);
                setCart(newCart);
                setOperation(null);
            };
            op();
        }
    }, [operation, login]);

    useEffect(() => {
        if (!login) return;
        const loadCart = async () => {
            if (cart === null) {
                const newCart = await getCart(login.userId);
                setCart(newCart);
            }
        }
        loadCart();
    }, [login]);

    useEffect(() => {
        if (!login) return;
        if (submittingOrder === true) {
            const op = async () => {
                try {
                    const order = await createOrderFromCart(login.userId);
                    alert("下单成功");
                    navigate('/orders/');
                    // TODO: listen order
                } catch (e) {
                    messageApi.error('下单失败');
                    setSubmittingOrder(false);
                }
            };
            op();
        }
    }, [login, submittingOrder])
    const defaultColumns = [
        {
            title: '图片',
            dataIndex: 'image',
            key: 'image',
            render: (text,item)=>{
                return (<Image
                    height={40}
                    width={40}
                    src={text}
                    alt={item.title}
                    />);
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '件数',
            dataIndex: 'quantity',
            key: 'quantity',
            editable: true,
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '小计',
            dataIndex: 'totalPrice',
            key: 'total-price',
        },
        {
            title: '操作',
            key: 'name',
            render: (_, item) => {
                return (
                    <div className="action-area">
                        <span className="plus-action-area">
                            <Button shape="circle" onClick={() => {
                                handleAddItem(item.id)
                            }}>+</Button>
                        </span>
                        <span className="plus-action-area">
                            <Button shape="circle" onClick={() => {
                                handleMinusItem(item.id)
                            }}>-</Button>
                        </span>
                        <span className="delete-action-area">
                            <Button shape="circle" danger onClick={() => {
                                handleDeleteItem(item.id)
                            }}>X</Button>
                        </span>
                    </div>
                );
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
    if (login === undefined || operation || submittingOrder) {
        return <Spin size="large"/>
    }
    if (login === null || !login.token) {
        return <Navigate to={"/login?back=" + decodeURIComponent("/cart")}/>;
    }
    if (cart === null) {
        return <Spin size="large"/>
    }
    return (
        <div className="cart-view">
            <Table
                columns={columns}
                components={components}
                rowClassName={() => 'editable-row'}
                pagination={false}
                dataSource={cart}/>
            {cart.length > 0 ? (<Button type="primary" onClick={handleSubmit}>提交订单</Button>) : null}
        </div>
    )
}
