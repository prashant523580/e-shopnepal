import React, { Component } from 'react'
import CheckoutComponent from '../components/CheckoutComponent'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
export default function Checkout(props:any) {

  const cartIncrement = (item : any) => {
    const {slug, qty, title, price, size, varient} = item;
    let incrementCartQuantity = {
      slug,
      qty : 1,
      title,price,size,varient,
    }
      props.addToCart(incrementCartQuantity)
  }
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap flex-col">
        <CheckoutComponent
          icon={<ContactMailIcon />}
          step={<h1>Step 1: Delivery Address</h1>}
        >
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
            <input type="text" id="full-name" name="full-name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="Address" className="leading-7 text-sm text-gray-600">Address</label>
            <input type="text" id="Address" name="Address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input type="Phone" id="Phone" name="Phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">city</label>
            <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="code" className="leading-7 text-sm text-gray-600">code</label>
            <input type="number" id="code" name="code" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <Button className='bg-gray-500 text-white hover:bg-slate-600'>Submit</Button>
        </CheckoutComponent>
        <CheckoutComponent
          icon={<ContactMailIcon />}
          step={<h1>Step 2: Cart Review</h1>}
        >
          <div  className=" inset-0  ">
    <div className="inset-0 ">
      <div className="pointer-events-none  inset-y-0  flex max-w-full pl-10">
   
        <div className="pointer-events-auto">
          <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
            

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                   
                    {
                  Object.keys(props.cart).length == 0 &&
                  <li className='flex py-6'>no cart items.</li>
                }
                {
                  Object.keys(props.cart).length > 0 &&
                  Object.keys(props.cart).map((key, ind) => {
                    return (
                      <li className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image src={props.cart[key].imgSrc} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." width={100} height={100} layout="responsive" className="h-full w-full object-cover object-center"/>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={`/product/${props.cart[key].slug}`}>{props.cart[key].title}</Link>
                            </h3>
                            <p className="ml-4">Rs.{props.cart[key].price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">{props.cart[key].category}</p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">Qty {props.cart[key].qty}</p>

                          <div className="flex">
                           
                            <div className="flex space-x-2 items-center ">
                          <button onClick={() => props.deleteFromCart(key, 1)} className='p-2 bg-gray-500 rounded-full w-6 h-6 text-center flex justify-center items-center'><RemoveIcon /></button>
                          <span className='p-2  w-8 text-center'>{props.cart[key].qty}</span>
                          <button
                          onClick={() => cartIncrement(props.cart[key])} 
                          className='p-2 bg-gray-500 rounded-full w-6 h-6 flex justify-center items-center'><AddIcon /></button>
                        </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    )
                  })
                }
                   

                    {/* <!-- More products... --> */}
                  </ul>
                </div>
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  </div>
              <div className='py-4'>
                <Link href="/orderComplete">
                <h1>Sub Total :  {props.subTotal}</h1>
                  <Button className='bg-orange-500 text-white hover:bg-orange-600 font-bold'>Pay Rs.{props.subTotal}</Button>
                </Link>
              </div>
        </CheckoutComponent>
    

      </div>
    </section>
  )
}
