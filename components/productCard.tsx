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
const css = { maxWidth: "100%", height: "100%" }
export default function ProductCard({ title, category, slug, imgSrc, price, size }: PropsTypes) {
  return (

    <Link href={slug} className="group relative transition-all  my-6 shadow-md px-2 py-1 hover:shadow-lg">
         {/* <Link href="#" className="group"> */}
        <div style={{
          height: 250
        }} className="aspect-w-1 aspect-h-1 w-full  overflow-hidden rounded-lg  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
          <Image width={100} height={100} sizes="100vw" src={imgSrc} alt={title} className="transition-all h-full w-full object-cover object-top  group-hover:opacity-75"/>
        </div>
        <h3 className="text-gray-500  text-xs tracking-widest title-font mb-1">CATEGORY : {category}</h3>
        <h3 className="mt-4 text-sm text-gray-700 truncate">{title}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">Rs.{price}</p>
        <p className="mt-1 uppercase space-x-2 "> {size && size.map((si:any,ind:number) => <span  key={ind}>{si} </span>)}</p>
    </Link > 


  )
}
