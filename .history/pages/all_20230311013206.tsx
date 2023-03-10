import React from 'react'
import { connectToDatabase } from '../lib/mongodb'
import Pants from './pant'
import Tshirt from './tshirt'

export default function All(props: any) {
    const [products, setProducts] = React.useState([]);
    const [productCategory, setProcuctCategory] = React.useState([]);
    React.useEffect(() => {
        console.log(products)
        let productArray: any = Object.keys(props.products).map((key) => {
            return props.products[key]
            productArray.push(props.products[key]);
            // products[key].reduce((values,items) => {

            //     if(values.includes(items.category)){
            //             values.push(items.category);
            //         }
            //             return values
            // },["all"])   
        })
        let category = productArray.reduce((values: Array<String>, items: any) => {
            if (!values.includes(items.category)) {
                values.push(items.category);
            }
            return values
        }, ["all"])
        setProcuctCategory(category);
        setProducts(productArray);
        console.log(category)
    }, [])
    return (
        <section className='flex'>
            <div className='w-[30%] h-[100vh] bg-gray-300' >
                <div>

                    <h1>shop by Category</h1>
                    <ul>
                        {
                            productCategory.map((category) => {
                                return(
                                    <li>{category}</li>
                                )
                            })
                        }
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
    let { DEV_URL, PROD_URL } = process.env;

    let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
    let { products } = await res.json();
    return {
        props: {
            products
        }
    }
}