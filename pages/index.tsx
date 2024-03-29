import Head from 'next/head'
import Image from 'next/image'
import React from 'react';
import ProductCard from '../components/productCard'
import { connectToDatabase } from '../lib/mongodb'

import { ToastContainer, toast } from 'react-toastify';
import Script from 'next/script';
import { generateImgUrl } from '../helpers/urlConfig';
import ProductContainer from '../components/ProductContainer';
import { AppDispatch, useAppDispatch, useAppSelector } from '../redux/store';
import { getAllProducts } from '../redux/actions/product.action';
import { useDispatch } from 'react-redux';

export default function Home(props: any) {
  const [product, setProduct] = React.useState<any>([]);
  const [numb, setNumb] = React.useState<number>(5);
  const [loader, setLoader] = React.useState<boolean>(false);

  const [loading, setLoading] = React.useState<boolean>(true);
  const {products} = useAppSelector(state => state);
  const dispatch = useDispatch<any>();
  React.useEffect(() => {
    dispatch(getAllProducts())
    setTimeout(() => {
      setLoading(false)
    }, 500)
    //  if(props.products.products != null){
    //  let prod : any = [];
    //  Object.keys(props.products.products).map((key: any) => {
    //   // console.log(props.products.products[key])
    //   prod.push(props.products.products[key])
    // })
    // setProduct(prod)
    // }
    
  }, [dispatch])
  React.useEffect(() => {
    console.log(products)
  },[products])
  const loadMoreData = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
      setNumb(numb + 5)
    }, 500)
  }
  return (
    <>
      <Head>
        <title>EShopNepal</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      {/* <Image src={"/images/banners/banner1.webp"} style={{
        width:"100%",
        objectFit:"contain"
      }}
      priority
      width={100}
      height={100}
      sizes={"100vw"}
    alt='banner' />  */}
      <ToastContainer />
      <section className="text-gray-600 body-font">

        {/* <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> */}
        <h2 className="text-center md:text-2xl lg:text-4xl font-bold py-6">Products For You</h2>

        <ProductContainer>
          {
            loading ?

              props.products != null && Object.keys(props.products).slice(0, numb).map((key: any, ind: any) => {
                return (
                  <div key={ind} role="status" className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700">
                      <svg className="w-12 h-12 text-gray-200 dark:text-gray-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" /></svg>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>

                    {/* <span className="sr-only">Loading...</span> */}
                  </div>
                )
              })
              :
              <>
                {
                  props.products != null && Object.keys(props.products).slice(0, numb).map((key: any, ind: any) => {
                    return (
                      <ProductCard
                        key={ind}
                        productItem={props.products[key]}
                        // slug={"/product/"+props.products[key].slug}
                        // title={props.products[key].title}
                        // price={props.products[key].price}
                        // category={props.products[key].category}
                        // imgSrc={generateImgUrl(props.products[key].imgSrc)}
                        // size ={props.products[key].size}

                        addToCart={() => {
                          let product = {
                            ...props.products[key],
                            qty: 1
                          }
                          // console.log(props.addToCart(product))
                          // console.log(product)
                          props.addToCart(product)
                        }
                        }
                      />
                    )
                  })
                }
              </>

          }



        </ProductContainer>
        {
          loader ?
            <div className="loading">loading...</div> : null
        }
        {
          numb < Object.keys(props.products).length ?
            loader ? null :
              <button
                style={{
                  width: "150px",
                  margin: ".3em auto",
                  marginLeft: ".9em",
                  fontSize: "1.1em",
                  padding: ".6em .9em",
                  border: "0",
                  cursor: "pointer"
                }}
                onClick={loadMoreData}>load more </button> : <p className='p'>Yay! You have seen it all</p>
        }
        {/* </div> */}

      </section>
    </>
  )
}

export const getServerSideProps = async () => {
  // let dev = process.env.NODE_ENV !== "production";
  // let {DEV_URL,PROD_URL} = process.env;

  // let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
  // let products = await res.json();
  let { db } = await connectToDatabase();
  let products = await db.collection("Products").find({})
    .toArray();
  // console.log(typeof products)
  let tshirts: any = {};
  for (let item of products) {
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
  // console.log(JSON.parse(tshirts))
  return {
    props: {
      products: JSON.parse(JSON.stringify(tshirts))
    }
  }
}
