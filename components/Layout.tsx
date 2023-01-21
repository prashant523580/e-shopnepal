import { Container } from '@mui/system';
import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

interface PropsTypes {
    children: React.ReactNode,
    cart: any,
    addToCart: any,
    deleteFromCart: any,
    clearCart: any,
    subTotal:any,
    user : any,
    logout: any,
}
export default function Layout(props:PropsTypes){
  const mainRef = React.useRef<any>();
  React.useEffect(() => {
      if(mainRef){

          mainRef.current.scrollIntoView({behavior:"smooth"})
        }
  },[mainRef.current])
    return (<>
       

      <main ref={mainRef} className='flex flex-col overflow-x-hidden' id='scroll'> 
              
            {/* <section className="text-gray-600 body-font overflow-x-hidden"> */}
            <Navbar  logout={props.logout} user={props.user} clearCart={props.clearCart} subTotal={props.subTotal} cart={props.cart} deleteFromCart={props.deleteFromCart} addToCart={props.addToCart}/>

                     {props.children}
              
            <Footer/>
               
            {/* </section> */}
     </main>
    </>
    )
  
}
