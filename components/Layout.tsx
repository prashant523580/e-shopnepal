import React, { Component } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface PropsTypes {
    children: React.ReactNode,
    cart: any,
    addToCart: any,
    deleteFromCart: any,
    clearCart: any,
    subTotal:any
}
export default function Layout(props:PropsTypes){
  
    return (
      <main className='flex flex-col h-[100vh] overflow-x-hidden'> 

            {/* <section className="text-gray-600 body-font overflow-x-hidden"> */}
            <Navbar cart={props.cart} deleteFromCart={props.deleteFromCart} addToCart={props.addToCart}/>
              
         
          
                {props.children}
              
            <Footer/>
            {/* </section> */}
     </main>
    )
  
}
