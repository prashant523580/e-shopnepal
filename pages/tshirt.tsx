import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductCard from "../components/productCard";
import ProductContainer from "../components/ProductContainer";

export default function Tshirts (props : any){
  const [loading,setLoading] = useState<boolean>(true);
  const [numb,setNumb] = useState<number>(8);
  
  const [product,setProduct] = React.useState<any>(props.products.products);
  const [loader,setLoader] = useState<boolean>(false);
  useEffect(() => {
     setTimeout(() => {
        setLoading(false)
     },100) 
     let prod : any = [];
     Object.keys(props.products.products).map((key: any) => {
      // console.log(props.products.products[key])
      prod.push(props.products.products[key])
    })
    setProduct(prod)
  },[loading,props])
  const loadMoreData = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
      setNumb(numb + 4)
   },500) 
  }
    return (
      <>
        {

          loading ?
            <section className="text-gray-600 body-font">
              <div className="container px-5 py-24 mx-auto">
              <h1>loading.....</h1>
              </div>
            </section>
            :
            <ProductContainer>
              
                <div className="flex flex-wrap -m-4 justify-center">
                  {
                    product.slice(0,numb).map((product: any ,ind: number) =>{
                      return(
                        <ProductCard
                      key={ind}
                      slug={"/product/"+product.slug}
                      title={product.title}
                      price={product.price}
                      category={product.category}
                      imgSrc={product.imgSrc}
                      size ={product.size}
                      />
                      )
                    })
                  }
                 
              
                </div>
                {
            loader ? 
            <div className="loading">loading...</div> : null
          }
          {
            numb <  product.length ? 
              loader ? null :
            <button
            style={{
              width:  "150px",
              margin:".3em auto",
              marginLeft:".9em",
              fontSize:"1.1em",
              padding: ".6em .9em",
              border:"0",
              cursor:"pointer"
            }}
             onClick={loadMoreData}>load more </button> : <p className='p'>Yay! You have seen it all</p>
          }
             
            </ProductContainer>
        }
      </>
    )
  }

  export const  getServerSideProps = async () => {
    let dev = process.env.NODE_ENV !== "production";
    let {DEV_URL,PROD_URL} = process.env;
  
    let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
    let products = await res.json();
    return{
      props:{
        products
      }
    }
  }