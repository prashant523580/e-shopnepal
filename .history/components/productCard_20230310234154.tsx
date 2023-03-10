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
  size?: any
}
export default function ProductCard({ title, category, slug, imgSrc, price, size }: PropsTypes) {
  return (
    <div className="group transition-all   rounded-md px-2 flex flex-col">

    <Link href={slug} >       
        <div style={{
          position:"relative",
          height: 250,
          // width:280
        }}
        className="aspect-w-1 border-b  aspect-h-1 w-full  overflow-hidden rounded-lg  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
         >
          <Image width={100} height={100} sizes="100vw"
           src={imgSrc} alt={title} 
           //  objectFit={"contain"}
           className="transition-all h-full w-full object-fill  object-top group-hover:opacity-75"
           />
        </div>
        <div>
          
        <h3 className="font-bold text-l text-gray-700 truncate">{title}</h3>
        <h3 className="text-gray-500  text-xm font-semibold tracking-widest title-font">CATEGORY : {category}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">Rs.{price}</p>
        <p className="mt-1 uppercase space-x-2 "> {size && size.map((si:any,ind:number) => <span  key={ind}>{si} </span>)}</p>
        </div>
        <Button style={{
          background:"#999",
          marginTop:" auto",
          color:"black",
          // fontWeight:"bold",
          width:"100%"
        }}>Add to Bag</Button>
       
    </Link > 

           </div>

  )
}
