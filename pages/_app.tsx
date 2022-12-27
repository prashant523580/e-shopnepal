import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = React.useState<any>({});
  const [subTotal, setSubTotal] = React.useState<number>(0);

  React.useEffect(() => {
    try{

      if (localStorage.getItem("cart")) {
        let data: any = localStorage.getItem("cart");
        
        // console.log(JSON.parse(data))
        data = JSON.parse(data)
        setCart(data);
        let subTot = 0;
        let keys = Object.keys(data);
        // console.log(newCart)
        for (let i = 0; i < keys.length; i++) {
          subTot += data[keys[i]].price * data[keys[i]].qty
        }
        setSubTotal(subTot)
      }
    }catch(error){
      localStorage.clear()
    }

  }, [])
  const saveCart = (newCart: any) => {
    localStorage.setItem("cart", JSON.stringify(newCart))
    let subTot = 0;
    let keys = Object.keys(newCart);
    // console.log(newCart)
    for (let i = 0; i < keys.length; i++) {
      subTot += newCart[keys[i]].price * newCart[keys[i]].qty
    }
    setSubTotal(subTot)
  }
  const addToCart = (cartItem: any) => {
    const { slug, qty, title, price, size, varient } = cartItem;
console.log(cartItem)
    let newCart = cart;
    // console.log(cart.includes(slug))
    if(slug in cart){
      // if (cart.includes(slug)) {
      newCart[slug].qty = cart[slug].qty + qty
    } else {
      
      // newCart[slug] = {qty : 1, title,price,size,varient}
      newCart[slug] = { ...cartItem, qty: 1 }
    }
    setCart(newCart)
    saveCart(newCart)
  }
  const deleteFromCart = (slug:any,qty:any) => {
    console.log(slug,qty)
    let newCart = cart;
    // console.log(newCart)
    if (slug in cart) {
      newCart[slug].qty = cart[slug].qty - qty
    }
    if (newCart[slug]["qty"] <= 0) {
      delete newCart[slug];
      
    }
    
    setCart(newCart)
    saveCart(newCart)
  }
  const clearCart = () => {
    setCart({});
    saveCart({})
  }
  React.useEffect(() => {
      // console.log(cart)
  },[cart])
  return <>
    <Layout cart={cart && cart} addToCart={addToCart} subTotal={subTotal} clearCart={clearCart} deleteFromCart={deleteFromCart}>

      <Component cart={cart && cart} addToCart={addToCart} subTotal={subTotal} clearCart={clearCart} deleteFromCart={deleteFromCart} {...pageProps} />
    </Layout>
  </>
}
