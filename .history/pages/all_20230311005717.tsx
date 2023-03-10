import React from 'react'
import { connectToDatabase } from '../lib/mongodb'
import Tshirt from './tshirt'

export default function All(props:any) {
    React.useEffect(() =>{
        console.log(props)
    },[])
  return (
    <section className='flex'>
        <div className='w-[30%] h-[100vh] bg-gray-300' >
                <div>

                <h1>shop by Category</h1>
                <ul>
                    <li>
                        <span>men's</span>
                        <ul>
                            <li>tshirt</li>
                            <li>pants</li>
                            <li>hoodies</li>
                        </ul>
                    </li>
                </ul>
                </div>
                <div>

                </div>
        </div>
        <div className='w-[70%] h-[100vh] bg-red-400' >
                
        </div>
    </section>
  )
}


export const getServerSideProps = async () => {
    // let {db} = await connectToDatabase();
    // let products = await db.collection("Products").find({}).toArray();
    let dev = process.env.NODE_ENV !== "production";
    let {DEV_URL,PROD_URL} = process.env;
  
    let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
    let { products }= await res.json();
    return{
        props:{
            products: JSON.stringify(JSON.parse(products))
        }
    }
}