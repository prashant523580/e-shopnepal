import Image from 'next/image';
import { useRouter } from 'next/router'
import React, {useEffect } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import Link from 'next/link';
import { connectToDatabase } from '../../lib/mongodb';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ProductSlug(props: any) {
  // const router = useRouter();
  const [product] = React.useState<any>(props.product);
  const [varients] = React.useState(props.varients);
  const [color,setColor] = React.useState(product.color);
  const [size,setSize] = React.useState(product.size); 
  const [checking, setChecking] = React.useState<boolean>(false);
  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [pin, setPin] = React.useState<number>();
  const [checkMessage, setCheckMessage] = React.useState("check");
  const [loading,setLoading] = React.useState<boolean>(true);
  const colors = ["red","black","blue","darkblue","pink","orange","darkred","lightblue","green","lightgreen","yellow","white","gray","maroon","purple"];
  React.useEffect(() => {
     setTimeout(() => {
        setLoading(false)
     },500) 
    },[])
  const checkServiceAbility = async () => {
    if (!pin) return false
    setChecking(true)
    setCheckMessage("checking...");
    let res = await fetch("/api/pincode");
    let data = await res.json();

    setTimeout(() => {
      if (data.pinCode.includes(pin)) {

        setCheckMessage("Verified");
        setIsVerified(true)
        setChecking(false);
        notify("Your pin code is Serviceable")
      } else {

        setCheckMessage("Unverified");
        notifyError("Your Pin Code Is Not Serviceable.")
        setIsVerified(false)
        setChecking(false);
      }
    },600)
    // setCheckMessage("check")
  }
  const addCart = () => {
    let cartProduct = {
      ...product,
      qty: 1
    }
    props.addToCart(cartProduct)
    notify("successfully added to cart.")
  }
  const getProductByVarient =(newColor : any,newSize : any) => {
    // console.log(newColor,newSize)
    let url = `/product/${varients[newColor][newSize]["slug"]}`
    window.location.href = url
    // console.log(varients);
  } 

  const notify = (str:string) => toast.success(str,{
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });

  const notifyError = (str:string) => toast.error(str,{
    position: "bottom-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  return (
    <section className="text-gray-600 body-font">
        <ToastContainer style={{
          zIndex:999999
        }}/>
      <div className="container px-4 mx-auto">
        {
          loading ? 
          <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center">
              <div className="flex items-center mx-auto justify-center w-[80%] h-50 bg-gray-300 rounded sm:w-full dark:bg-gray-700">
                  <svg className="w-42 h-42 text-gray-200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" fill="currentColor" viewBox="0 0 640 512"><path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z"/></svg>
              </div>
              <div className="w-full">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
              </div>
              {/* <span className="sr-only">Loading...</span> */}
          </div>
          :
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
       

            <Image 
            style={{
              height: 430
            }}
            alt="ecommerce"
            sizes='100vw'
            width={100}
            height={100}
            objectFit="contain"
            className='lg:w-1/2 w-full lg:h-auto   rounded object-contain'
            src={product.imgSrc} 
            priority
            />
         
          <div className="lg:w-1/2 w-full lg:pl-5 lg:py-4 mt-3 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME : <span className='text-2xl font-semibold capitalize text-gray-800'> {product.brand}</span> </h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1 ">{product.title} <span className='uppercase'>({color}/{size}) </span></h1>
            {/* <div className="flex mb-4">
              <span className="flex items-center">
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-gray-600 ml-3">4 Reviews</span>
              </span>
              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                  </svg>
                </a>
                <a className="text-gray-500">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                  </svg>
                </a>
              </span>
            </div> */}
            <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2  mb-5">
              <div className="flex">
                <span className="mr-3 space-x-2">Color</span>
                {/* {
                 Object.keys(varients) &&  Object.keys(varients).map((item : any) => {
                    // console.log(varients[item])
                    Object.keys(varients[item]).map((siz: any) => {
                      // console.log(varients[item][ite].slug)
                        return(
                        <button onClick={() => getProductByVarient(varients[item], varients[item][siz])}  style={{background: varients[item]}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>)
                    })
                  })
                } */}

                {colors.map((col:any, ind:any) => {
                    return(
                      Object.keys(varients).includes(col) && Object.keys(varients[col]).includes(size) && <button onClick={() => getProductByVarient(col,size)}  style={{background: col}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>
                    )
                })}
                
                
              </div>
              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <div className="relative">
                  <select value={size} onChange={ (e) => getProductByVarient(color, e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                    {Object.keys(varients[color]).includes("S") && <option value="S">S</option>}
                    {Object.keys(varients[color]).includes("M") && <option value="M">M</option>}
                    {Object.keys(varients[color]).includes("L") && <option value="L">L</option>}
                    {Object.keys(varients[color]).includes("XL") && <option value="XL">XL</option>}
                    {Object.keys(varients[color]).includes("XXL") && <option value="XXL">XXL</option>}
                  </select>
                  <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-wrap">
              <span className="title-font font-medium text-2xl text-gray-900">Rs.{product.price}</span>
              <div className="flex justify-end items-center space-x-2">
            
                <Button onClick={() => props.buyNow(product)}  className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded font-bold capitalize">

                    Buy
                </Button>
                <Button
                  onClick={addCart}
                  className="flex ml-auto text-white bg-slate-600 border-0 py-2 px-6 focus:outline-none hover:bg-slate-800 rounded font-bold capitalize">Add To Cart</Button>
                <Button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </Button>
              </div>
            </div>
            {/* <div className="pin mt-2 space-x-2 p-2 rounded-sm flex items-center justify-start">
              <input value={pin} onChange={(e) => setPin(parseInt(e.target.value))} placeholder='pincode' type="number" className=' bg-gray-300  p-2 w-[25vw] outline-none rounded-sm' />
              <Button onClick={checkServiceAbility} className='text-white hover:bg-slate-700 bg-slate-600 w-max-[30vw]'>{checkMessage}</Button>

              {
                checkMessage === "Verified" || checkMessage === "Unverified" &&
                !isVerified && pin != null &&
                <span className={"bg-red-600 w-8 h-8 rounded-full text-center flex justify-center text-white items-center"}> <HighlightOffIcon /> </span>
              }
              {
                isVerified && pin != null &&

                <span className={"bg-green-600 w-8 h-8 rounded-full text-center flex justify-center text-white items-center"}><CheckIcon /> </span>
              }
            </div> */}

          </div>
        </div>
        }
      </div>

      
    </section>
  )

}
export const getServerSideProps = async (ctx: any) => {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;
  // console.log(ctx.query.slug)
  let { slug } = ctx.query;
  // let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/product/getProductBySlug`);
  // let products = await res.json();
  // let {varients,product} = products
  let {db} = await connectToDatabase();
        let product = await db.collection("Products").findOne({slug:ctx.query.slug});
   
            let varients = await db.collection("Products").find({title: product.title,category:product.category}).toArray();
            // console.log(varients)
                let colorSizeSlug : any = {};  //{ color:{size: {slug : #}}}
                for(let item of varients){
                       if( Object.keys(colorSizeSlug).includes(item.color)){
                            colorSizeSlug[item.color][item.size] = {slug:item.slug}
                        }else{
                            colorSizeSlug[item.color] = {}
                            colorSizeSlug[item.color][item.size] = {slug:item.slug}
                        }
                    }
                    // console.log(colorSizeSlug)
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      varients: JSON.parse(JSON.stringify(colorSizeSlug))
    }
  }
}
