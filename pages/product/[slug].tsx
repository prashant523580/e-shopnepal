import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { Component, useEffect } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckIcon from '@mui/icons-material/Check';
import { Button } from "@mui/material";
import Link from 'next/link';
export default function ProductSlug(props: any) {
  const router = useRouter();
  const [product] = React.useState<any>(props.product);
  const [varients] = React.useState(props.varients);
  const [color,setColor] = React.useState(product.color);
  const [size,setSize] = React.useState(product.size); 
  const [checking, setChecking] = React.useState<boolean>(false);
  const [isVerified, setIsVerified] = React.useState<boolean>(false)
  const [pin, setPin] = React.useState<number>();
  const [checkMessage, setCheckMessage] = React.useState("check");
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
      } else {

        setCheckMessage("Unverified");

        setIsVerified(false)
        setChecking(false);
      }
    }, 600)
    // setCheckMessage("check")
  }
  const addCart = () => {
    let cartProduct = {
      ...product,
      qty: 1
    }

    props.addToCart(cartProduct)
  }
  const getProductByVarient =(newColor : any,newSize : any) => {
    let dev = process.env.NODE_ENV !== "production";
    let { DEV_URL, PROD_URL } = process.env;
    let url = `${dev ? DEV_URL : PROD_URL}/product/${varients[newColor][newSize]["slug"]}`
    window.location.href = url
    // console.log(varients);
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-6 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img 
            alt="ecommerce"
            className='lg:w-1/2 w-full lg:h-auto h-64 rounded object-cover object-center'
            src={product.imgSrc} 
            />
         
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title}</h1>
            <div className="flex mb-4">
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
            </div>
            <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
            <div className="flex mt-6 items-center pb-5 border-b-2  mb-5">
              <div className="flex">
                <span className="mr-3 space-x-2">Color</span>
                
                {Object.keys(varients).includes("white") && Object.keys(varients["white"]).includes(size) && <button onClick={() => getProductByVarient("white",size)}  style={{background: "white"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("gray") && Object.keys(varients["gray"]).includes(size) && <button onClick={() => getProductByVarient("gray",size)}  style={{background: "gray"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("black") && Object.keys(varients["black"]).includes(size) && <button onClick={() => getProductByVarient("black",size)}  style={{background: "black"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("red") && Object.keys(varients["red"]).includes(size) && <button onClick={() => getProductByVarient("red",size)}  style={{background: "red"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("blue") && Object.keys(varients["blue"]).includes(size) && <button onClick={() => getProductByVarient("blue",size)}  style={{background: "blue"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("green") && Object.keys(varients["green"]).includes(size) && <button onClick={() => getProductByVarient("green",size)}  style={{background: "green"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("lightgreen") && Object.keys(varients["lightgreen"]).includes(size) && <button onClick={() => getProductByVarient("lightgreen",size)}  style={{background: "lightgreen"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("lightblue") && Object.keys(varients["lightblue"]).includes(size) && <button onClick={() => getProductByVarient("lightblue",size)}  style={{background: "lightblue"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("darkblue") && Object.keys(varients["darkblue"]).includes(size) && <button onClick={() => getProductByVarient("darkblue",size)}  style={{background: "darkbluen"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {Object.keys(varients).includes("yellow") && Object.keys(varients["yellow"]).includes(size) && <button onClick={() => getProductByVarient("yellow",size)}  style={{background:"yellow"}} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>}
                {
                  // product.color.map((colo: any, ind: any) => {
                  //   return (

                      // <button key={ind} value={colo} style={{
                      //   background: colo
                      // }} defaultValue={colo} onClick={(e: any) => {
                      //   console.log(e.target.value)
                      // }} className={`border-2 mx-1 rounded-full w-6 h-6 focus:outline-none`}></button>
                  //   )
                  // })
                }
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
                  <Button className="flex ml-auto text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded font-bold capitalize">
                <Link href={"/checkout"}>

                    Buy
                </Link>
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
            <div className="pin mt-2 space-x-2 p-2 rounded-sm flex items-center justify-start">
              <input value={pin} onChange={(e) => setPin(parseInt(e.target.value))} placeholder='pincode' type="number" className=' bg-gray-300  p-2 w-[25vw] outline-none rounded-sm' />
              <Button onClick={checkServiceAbility} className='text-white hover:bg-slate-700 bg-slate-600 w-max-[30vw]'>{checkMessage}</Button>

              {
                // checkMessage === "Verified" || checkMessage === "Unverified" &&
                !isVerified && pin != null &&
                <span className={"bg-red-600 w-8 h-8 rounded-full text-center flex justify-center text-white items-center"}> <HighlightOffIcon /> </span>
              }
              {
                isVerified && pin != null &&

                <span className={"bg-green-600 w-8 h-8 rounded-full text-center flex justify-center text-white items-center"}><CheckIcon /> </span>
              }
            </div>

          </div>
        </div>
      </div>
    </section>
  )

}
export const getServerSideProps = async (ctx: any) => {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;
  // console.log(ctx.query.slug)
  let { slug } = ctx.query;
  let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/product/${slug}`);
  let products = await res.json();
  let {varients,product} = products
  return {
    props: {
      product,varients
    }
  }
}
