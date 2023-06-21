
export function getLocalStorageLogin(){
    const loginString=localStorage.getItem('login');
    if(loginString&&loginString.length)return JSON.parse(loginString);
    return null;
}

export function setLocalStorageLogin(login){
    if(login) localStorage.setItem('login',JSON.stringify(login));
    else localStorage.removeItem('login');
}