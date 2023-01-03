import Script from 'next/script'
import React, { Component } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface PropsTypes {
    children: React.ReactNode,
    cart: any,
    addToCart: any,
    deleteFromCart: any,
    clearCart: any,
    subTotal:any,
    user : any
}
export default function Layout(props:PropsTypes){
  const mainRef = React.useRef<any>();
  React.useEffect(() => {
      if(mainRef){

          mainRef.current.scrollIntoView({behavior:"smooth"})
        }
  },[mainRef])
    return (<>
       
      <main ref={mainRef} className='flex flex-col h-[100vh] overflow-x-hidden' id='scroll'> 

            {/* <section className="text-gray-600 body-font overflow-x-hidden"> */}
            <Navbar user={props.user} clearCart={props.clearCart} subTotal={props.subTotal} cart={props.cart} deleteFromCart={props.deleteFromCart} addToCart={props.addToCart}/>
                {props.children}
              
            <Footer/>
            {/* </section> */}
     </main>
    </>
    )
  
}
