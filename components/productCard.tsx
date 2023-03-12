import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { generateImgUrl } from '../helpers/urlConfig';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
interface PropsTypes {
  imgSrc?: string,
  slug?: string,
  title?: string,
  price?: number,
  category?: string,
  size?: any,
  addToCart?: () => void,
  brand?: string,
  productItem?: any,
}
export default function ProductCard({ addToCart, productItem }: PropsTypes) {
  const { title, category, slug, imgSrc, price, size, brand } = productItem;
  // console.log(title)
  return (

    <div className="transition-all rounded-md flex flex-col">

      <Link href={"/product/" + slug} >
        <div
          className="aspect-w-1 relative border-b h-[200px] max-md:h-[150px]  aspect-h-1 w-full  overflow-hidden rounded-lg  bg-gray-200 xl:aspect-w-7 xl:aspect-h-8"
      
        >
          <Image 
          fill
          sizes='100%'
            src={generateImgUrl(imgSrc)} alt={title}
            priority
            //  objectFit={"contain"}
            className="transition-all h-full w-full object-fill  object-top group-hover:opacity-75"
          />
          <p className=" absolute left-1 top-1  bg-gray-500 opacity-60 rounded-xl px-2  text-sm text-white">{brand}<LocalOfferIcon sx={{
            fontSize:15
          }}/></p>
          <p className=" absolute bottom-2 right-2 bg-orange-600 rounded-md px-2  text-sm font-medium text-white">Rs.{price}</p>
        </div>
        <div className='px-2 py-1'>

          <h3 style={{
            fontFamily: "var(--font-kaveat)"
          }} className="font-bold text-sm text-gray-500 truncate">{title}</h3>
          <h3 className="text-gray-600  text-sm  title-font">Category : {category}</h3>

          <p className=" uppercase space-x-2 text-xs"> {size.length > 0 ? size.map((si: any, ind: number) => <span key={ind}>{si} </span>) : "Out Of Stock"}</p>
        </div>
      </Link >
      <Button onClick={addToCart} style={{
        background: "rgba(225,225,225,1)",
        marginTop: " auto",
        color: "rgba(0,0,0,0.6)",
        fontWeight: "bold",
        width: "100%",
        borderRadius: 0,
        fontFamily:"sans-serif",
        textTransform:"capitalize"
      }}>Add to Bag <ShoppingCartOutlinedIcon sx={{
        ml:2,
      }}/></Button>


    </div>

  )
}
