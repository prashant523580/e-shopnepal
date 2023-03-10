import React from 'react'
import ProductCard from '../components/productCard';
import ProductContainer from '../components/ProductContainer';
import { generateImgUrl } from '../helpers/urlConfig';
import { connectToDatabase } from '../lib/mongodb'
import Pants from './pant'
import Tshirt from './tshirt'

export default function All(props: any) {
    const [products, setProducts] = React.useState<Array<object>>([]);
    const [productCategory, setProcuctCategory] = React.useState<Array<string>>([]);
    const [currentProducts, setCurrentProducts] = React.useState<Array<Object>>(products);
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
    const handleProducts = (category: string) => {
        console.log(category)
        let currentProductArray: Array<object> = [];
        products.filter((product: any) => {
            if (product.category === category) {
                currentProductArray.push(product)
            }
        })
        if(category === "all"){
            currentProductArray = products;
        }
        setCurrentProducts(currentProductArray)
        console.log(currentProductArray)
    }
    return (
        <section className='flex justify-around'>
            <div className='w-[30%] h-[100vh] bg-gray-300' >
                <div>

                    <h1>shop by Category</h1>
                    <ul>
                        {
                            productCategory.map((category) => {
                                return (
                                    <li onClick={() => handleProducts(category)}>{category}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div>

                </div>
            </div>
            <div className='w-[65%] bg-gray-300' >

                <ProductContainer>

                    {
                        currentProducts.map((product: any) => {
                            console.log(product)
                            return (
                                <ProductCard
                                    title={product.title}
                                    category={product.category}
                                    imgSrc={generateImgUrl(product.imgSrc)}
                                    price={product.price}
                                    slug={product.slug}
                                    size={product.size}
                                    addToCart={() => {
                                        let cartProduct = {
                                            ...product,
                                            qty: 1
                                        }
                                        props.addToCart(cartProduct)
                                    }}
                                />
                            )
                        })
                    }
            </ProductContainer>
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