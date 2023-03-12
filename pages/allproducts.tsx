import React from 'react'
import MainLayout from '../components/MainLayout';
import ProductCard from '../components/productCard';
import { connectToDatabase } from '../lib/mongodb';
import { getAllProducts } from '../redux/actions/product.action';
import { useAppDispatch, useAppSelector } from '../redux/store';

export default function All(props: any) {
    const [allProducts, setAllProducts] = React.useState<Array<object>>([]);
    const [productCategory, setProcuctCategory] = React.useState<Array<string>>([]);
    const [currentProducts, setCurrentProducts] = React.useState<Array<Object>>([]);
    const [brandCategory, setBrandCategory] = React.useState<Array<string>>([]);
    const { products } = useAppSelector(state => state.products);
    const dispatch = useAppDispatch();
    React.useEffect(() => {
        // dispatch(getAllProducts())
        // console.log(category)
    }, [dispatch])
    React.useEffect(() => {
        // console.log(products.products)
        let productArray: any = Object.keys(products).map((key) => {
            return props.products[key]

        })
        let category = productArray.reduce((values: Array<String>, items: any) => {
            if (!values.includes(items.category)) {
                values.push(items.category);
            }
            return values
        }, ["all"])
        setProcuctCategory(category);
        setAllProducts(productArray);
        setCurrentProducts(productArray)
        let brands = productArray.reduce((values: Array<String>, items: any) => {
            if (!values.includes(items.brand)) {
                values.push(items.brand);
            }
            return values
        }, [])
        setBrandCategory(brands)

    }, [products])
    const handleProducts = (category: string) => {
        console.log(category)
        let currentProductArray: Array<object> = [];
        allProducts.filter((product: any) => {
            if (product.category === category) {
                currentProductArray.push(product)
            }
        })
        if (category === "all") {
            currentProductArray = allProducts;
        }
        setCurrentProducts(currentProductArray)
        console.log(products)
    }
    const handleBrands = (brand: string) => {
        // console.log(category)
        let currentBrandArray: Array<object> = [];
        allProducts.filter((product: any) => {
            if (product.brand === brand) {
                currentBrandArray.push(product)
            }
        })

        setCurrentProducts(currentBrandArray)

    }
    return (
        <MainLayout>

        <section className='flex justify-between flex-row  max-md:flex-col '>
            <div className='w-[25%] max-md:w-[100%] max-md:flex flex-row sm:px-1 md:px-2 lg:px-3 xl:px-5 h-[100vh] max-md:h-[auto] bg-gray-300 rounded-3xl' >
                <div className='px-1 py-5 max-md:flex-row'>
                    <div>

                    <h1 className='capitalize font-bold'>shop by Category</h1>
                    <div className='h-1 w-20 bg-orange-500'></div>
                    </div>
                    <ul>
                        {
                            productCategory.map((category, ind) => {
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
                            brandCategory.map((category, ind) => {
                                return (
                                    <li key={ind} className='capitalize my-1 cursor-pointer' onClick={() => handleBrands(category)}>{category}</li>
                                    )
                            })
                        }
                    </ul>
                </div>

            </div>
            <div className='w-[70%] max-md:w-[100%] my-3 h-[100vh] overflow-y-auto scrollbar-hide bg-gray-300 rounded-3xl shadow-xl' >

                <div className='mt-6 grid grid-cols-2 px-8 gap-y-6 gap-x-3 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-5'>

                    {
                        currentProducts.map((product: any, ind) => {
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
</MainLayout>
    )
}


export const getServerSideProps = async () => {
    // let dev = process.env.NODE_ENV !== "production";
    // let { DEV_URL, PROD_URL } = process.env;
    
    // let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
    // let { products } = await res.json();
    let { db } = await connectToDatabase();
    let products = await db.collection("Products").find({})
        .toArray();
    // console.log(typeof products)
    let tshirts: any = {};
    for (let item of products) {
        // console.log(item.title)
        if (item.title in tshirts) {
            if (!tshirts[item.title].color.includes(item.color) && item.availableQuantity > 0) {
                tshirts[item.title].color.push(item.color)
            }
            if (!tshirts[item.title].size.includes(item.size) && item.availableQuantity > 0) {
                tshirts[item.title].size.push(item.size)
            }
        } else {
            tshirts[item.title] = item
            if (item.availableQuantity > 0) {
                tshirts[item.title].size = [item.size];
                tshirts[item.title].color = [item.color]
            } else {
                tshirts[item.title].size = [];
                tshirts[item.title].color = []

            }
        }

    }
    // console.log(tshirts)
    return {
        props: {
            products: JSON.parse(JSON.stringify(tshirts))
        }
    }
}