import React from 'react'
import ProductCard from '../components/productCard';
import Tshirt from './tshirt'

export default function All(props: any) {
    const [products, setProducts] = React.useState<Array<object>>([]);
    const [productCategory, setProcuctCategory] = React.useState<Array<string>>([]);
    const [currentProducts, setCurrentProducts] = React.useState<Array<Object>>([]);
    const [brandCategory, setBrandCategory] = React.useState<Array<string>>([]);
    React.useEffect(() => {
        // console.log(products)
        let productArray: any = Object.keys(props.products).map((key) => {
            return props.products[key]
          
        })
        let category = productArray.reduce((values: Array<String>, items: any) => {
            if (!values.includes(items.category)) {
                values.push(items.category);
            }
            return values
        }, ["all"])
        setProcuctCategory(category);
        setProducts(productArray);
        setCurrentProducts(productArray)
        let brands = productArray.reduce((values: Array<String>, items: any) => {
            if (!values.includes(items.brand)) {
                values.push(items.brand);
            }
            return values
        }, [])
        setBrandCategory(brands)
        // console.log(category)
    }, [props])
    const handleProducts = (category: string) => {
        console.log(category)
        let currentProductArray: Array<object> = [];
        products.filter((product: any) => {
            if (product.category === category) {
                currentProductArray.push(product)
            }
        })
        if (category === "all") {
            currentProductArray = products;
        }
        setCurrentProducts(currentProductArray)
        console.log(currentProductArray)
    }
    const handleBrands = (brand: string) => {
        // console.log(category)
        let currentBrandArray: Array<object> = [];
        products.filter((product: any) => {
            if (product.brand === brand) {
                currentBrandArray.push(product)
            }
        })

        setCurrentProducts(currentBrandArray)

    }
    return (
        <section className='flex justify-between'>
            <div className='w-[25%] sm:px-1 md:px-2 lg:px-3 xl:px-5 h-[100vh] bg-gray-300 rounded-3xl' >
                <div className='px-1 py-5'>

                    <h1 className='capitalize font-bold'>shop by Category</h1>
                    <div className='h-1 w-20 bg-orange-500'></div>
                    <ul>
                        {
                            productCategory.map((category,ind) => {
                                return (
                                    <li key={ind} className='capitalize my-1 cursor-pointer' onClick={() => handleProducts(category)}>{category}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className='px-1 py-5'>

                    <h1 className='capitalize font-bold'>Brands</h1>
                    <div className='h-1 w-20 bg-orange-500'></div>
                    <ul>
                        {
                            brandCategory.map((category,ind) => {
                                return (
                                    <li key={ind} className='capitalize my-1 cursor-pointer' onClick={() => handleBrands(category)}>{category}</li>
                                )
                            })
                        }
                    </ul>
                </div>

            </div>
            <div className='w-[70%] h-[100vh] overflow-y-auto scrollbar-hide bg-gray-300 rounded-3xl shadow-xl' >

                <div className='mt-6 grid grid-cols-1 px-8 gap-y-6 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5'>

                    {
                        currentProducts.map((product: any,ind) => {
                            console.log(product)
                            return (
                                <ProductCard
                                key={ind}
                                    productItem={product}
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
                </div>
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