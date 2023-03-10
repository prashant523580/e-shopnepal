import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { generateImgUrl } from '../helpers/urlConfig';
interface PropsTypes {
  imgSrc?: string,
  slug?: string,
  title?: string,
  price?: number,
  category?: string,
  size?: any,
  addToCart?: ()=> void,
  brand?: string,
  productItem?: any,
}
export default function ProductCard({ addToCart  ,productItem }: PropsTypes) {
    const {title, category, slug, imgSrc, price, size,brand} = productItem;
  console.log(title)
  return (

    productItem ?    <div className="transition-all rounded-md flex flex-col">

    <Link href={"/product"+slug} >       
        <div style={{
          position:"relative",
          height: 200,
          // width:280
        }}
        className="aspect-w-1 border-b  aspect-h-1 w-full  overflow-hidden rounded-lg  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
         >
          <Image fill sizes="100vw"
           src={generateImgUrl(imgSrc)} alt={title} 
           //  objectFit={"contain"}
           className="transition-all h-full w-full object-fill  object-top group-hover:opacity-75"
           />
          <p className=" absolute left-0 bottom-12 rotate-90 bg-gray-500 opacity-40 rounded-xl px-2  text-lg font-sm text-white">{brand}</p>
          <p className=" absolute bottom-2 right-2 bg-orange-400 rounded-md px-2  text-lg font-medium text-white">Rs.{price}</p>
        </div>
        <div className='px-2'>
          
        <h3 style={{
          fontFamily: "var(--font-kaveat)"
        }} className="font-bold text-l text-gray-700 truncate">{title}</h3>
        <h3 className="text-gray-500  text-xm   title-font">Category : {category}</h3>
        
        <p className=" uppercase space-x-2 "> {size.length > 0 ? size.map((si:any,ind:number) => <span  key={ind}>{si} </span>) : "Out Of Stock"}</p>
        </div>
        </Link > 
        <Button onClick={addToCart} style={{
          background:"rgba(0,0,0,0.3)",
          marginTop:" auto",
          color:"black",
          fontWeight:"200",
          width:"100%",
          borderRadius:0
        }}>Add to Bag</Button>
       

           </div>  :
    <div className="transition-all rounded-md flex flex-col">

    <Link href={slug} >       
        <div style={{
          position:"relative",
          height: 200,
          // width:280
        }}
        className="aspect-w-1 border-b  aspect-h-1 w-full  overflow-hidden rounded-lg  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
         >
          <Image fill sizes="100vw"
           src={imgSrc} alt={title} 
           //  objectFit={"contain"}
           className="transition-all h-full w-full object-fill  object-top group-hover:opacity-75"
           />
          <p className=" absolute left-2 top-2 bg-orange-400 px-2  text-lg font-medium text-white">Rs.{brand}</p>
          <p className=" absolute bottom-2 right-2 bg-orange-400 px-2  text-lg font-medium text-white">Rs.{price}</p>
        </div>
        <div className='px-2'>
          
        <h3 style={{
          fontFamily: "var(--font-kaveat)"
        }} className="font-bold text-l text-gray-700 truncate">{title}</h3>
        <h3 className="text-gray-500  text-xm   title-font">Category : {category}</h3>
        
        <p className=" uppercase space-x-2 "> {size.length > 0 ? size.map((si:any,ind:number) => <span  key={ind}>{si} </span>) : "Out Of Stock"}</p>
        </div>
        </Link > 
        <Button onClick={addToCart} style={{
          background:"rgba(0,0,0,0.3)",
          marginTop:" auto",
          color:"black",
          fontWeight:"200",
          width:"100%",
          borderRadius:0
        }}>Add to Bag</Button>
       

           </div>

  )
}
