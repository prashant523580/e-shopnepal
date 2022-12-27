import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
interface PropsTypes {
  imgSrc: string,
  slug: string,
  title: string,
  price: number,
  category: string,
  size:any
}
const css = {maxWidth:"100%",height:"100%"}
export default function ProductCard({ title,category,slug,imgSrc,price,size }: PropsTypes) {
  return (

    <Link href={slug} className="lg:w-1/5 md:w-1/2 p-2  z-1 w-full transition-all shadow-md m-6 hover:shadow-lg">

      <div className="block  rounded h-40 overflow-hidden">
        <Image 
        alt="ecommerce"
         width={100} 
         height={100}
        //  layout='responsive'
         className=" m-auto md:0 " 
          sizes='100vw' 
          style={{
            height:"100%",
            width:"100%",
            objectFit:"contain"
          }} 
          src={imgSrc} />
      </div>
      <div className="mt-4 text-center md:text-left">
        <h3 className="text-gray-500  text-xs tracking-widest title-font mb-1">CATEGORY : {category}</h3>
        <h2 className="text-gray-900 title-font text-lg font-medium truncate">{title}</h2>
        <p className="mt-1 ">Rs.{price}</p>
        <p className="mt-1 uppercase space-x-2 "> {size.map((si:any,ind:number) => <span  key={ind}>{si} </span>)}</p>
      </div>
    </Link>


  )
}
