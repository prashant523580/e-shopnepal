import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface PropsTypes {
  imgSrc: string,
  slug: string,
  title: string,
  price: number,
  category: string,
  size?: any,
  addToCart?: ()=> void
}
export default function ProductCard({ title, category, slug, imgSrc, price, size,addToCart }: PropsTypes) {
  return (
    <div className="group transition-all   rounded-md flex flex-col shadow-md">

    <Link href={slug} >       
        <div style={{
          position:"relative",
          height: 200,
          // width:280
        }}
        // className="aspect-w-1 border-b  aspect-h-1 w-full  overflow-hidden rounded-lg  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
         >
          <Image fill sizes="100vw"
           src={imgSrc} alt={title} 
           //  objectFit={"contain"}
           className="transition-all h-full w-full object-fill  object-top group-hover:opacity-75"
           />
        </div>
        <div className='px-2'>
          
        <h3 style={{
          fontFamily: "var(--font-kaveat)"
        }} className="font-bold text-l text-gray-700 truncate">{title}</h3>
        <h3 className="text-gray-500  text-xm font-semibold tracking-widest title-font">CATEGORY : {category}</h3>
        <p className=" text-lg font-medium text-gray-900">Rs.{price}</p>
        <p className=" uppercase space-x-2 "> {size && size.map((si:any,ind:number) => <span  key={ind}>{si} </span>)}</p>
        </div>
        </Link > 
        <Button onClick={addToCart} style={{
          background:"#999",
          marginTop:" auto",
          color:"black",
          fontWeight:"200",
          width:"100%",
          borderRadius:0
        }}>Add to Bag</Button>
       

           </div>

  )
}
