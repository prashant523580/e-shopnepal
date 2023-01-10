import '../styles/globals.css'
import NextProgress from 'next-progress';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import React, { Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Container from '../components/Container';

export default function App({ Component, pageProps }: AppProps) {
  const [cart, setCart] = React.useState<any>({});
  const [subTotal, setSubTotal] = React.useState<number>(0);
  const [keys, setKeys] = React.useState<number>(0);
  const router = useRouter()
const [user,setUser] = React.useState<any>({value : null});
  React.useEffect(  ()  =>  {
    try{

      if (localStorage.getItem("cart")) {
        let data: any = localStorage.getItem("cart");
        
        // console.log(JSON.parse(data))
        data = JSON.parse(data)
        setCart(data);
        saveCart(data);
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
    let token = localStorage.getItem("token");
    let user : any = localStorage.getItem("user");
    if(user){
        user = JSON.parse(user);
      setUser({value: user})
    }
  },[router.asPath])

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
// console.log(cartItem)
    let newCart = cart;
    // console.log(cart.includes(slug))
    if(slug in cart){
      // if (cart.includes(slug)) {
        console.log(cart)
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
 
  const buyNow = (cartItem: any) => {
    // console.log(cartItem)
    cartItem.qty = 1
    saveCart({})
    // localStorage.clear();
    addToCart(cartItem)
  }
  const logout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({value:null})
    // console.log(user)
    router.push("/")
    toast.success("Successfully Logout.", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
  const renderLoading = () => {
    return(<>
      <h1>Namaste</h1>
      <p>Loading......</p>
    </>
    )
  }
  return(

    <>
    <NextProgress   delay={300} options={{ showSpinner: false }} />
    <Layout key={keys} logout={logout} user={user} cart={cart && cart} addToCart={addToCart} subTotal={subTotal} clearCart={clearCart} deleteFromCart={deleteFromCart}>
      <Container>
    <ToastContainer/>

      <Component key={router.asPath} user={user} buyNow={buyNow} cart={cart && cart} addToCart={addToCart} subTotal={subTotal} clearCart={clearCart} deleteFromCart={deleteFromCart} {...pageProps} />
      </Container>
    </Layout>
  </>
    ) 
}
