// export const loadCart=(setCart)=>{
//     const loadedCart=JSON.parse(localStorage.getItem('cart'));
//     if(loadedCart===null){
//         const newCart=[];
//         localStorage.setItem('cart',JSON.stringify(newCart));
//         setCart(newCart);
//         return;
//     }
//     setCart(loadedCart);
// }
export const saveCart=(cart)=>{
    //console.log('saving cart!');
    localStorage.setItem('cart',JSON.stringify(cart));
}
