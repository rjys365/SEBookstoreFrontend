export function UserList(props) {
    const { users, blockUser, unBlockUser } = props;
    return (
            users.map((user) => {
                const role=user.role;
                const roleDiscription=(role===0?"已封禁用户":(role===1?"普通用户":"管理员"));
                const blocked=user.role===0;
                return (<div key={user.userId}>
                    <span>{"id:"+user.id}</span>
                    <span>{"名字："+user.name}</span>
                    <span>{roleDiscription}</span>
                    {role!==2?<button onClick={() => { if (blocked) unBlockUser(user.id); else blockUser(user.id) }}>{blocked ? "解封" : "封禁"}</button>:null}
                </div>);
            })
        
    );
}