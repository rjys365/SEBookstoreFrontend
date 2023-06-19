
export const submitRegister=async(registerRequest)=>{
    const responseJson=await fetch('http://localhost:8080/users/',{
        method:'POST',
        headers:{
            'Content-type':'application/json',
        },
        body:JSON.stringify(registerRequest)
    })
    // console.log(JSON.stringify(responseJson));
    if (responseJson.status !== 201) {
        //alert('注册失败！');
        throw new Error('注册失败！');
    }
    return await responseJson.json();
}
