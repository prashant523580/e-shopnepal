import React from 'react'

export default function CheckoutComponent(props : any) {
  return (
        <div className="checkout">
            <div className="header w-full border-b">
            <a className="sm:px-3 px-3 py-3 space-x-2 w-1/1 sm:w-auto justify-center sm:justify-start border-b-2 title-font font-medium bg-gray-100 inline-flex items-center leading-none border-indigo-500 text-indigo-500 tracking-wider rounded-t">
           {props.icon}{props.step}
          </a>
            </div>
            <div className="body w-2/2 mx-auto md:w-1/2 py-10 sm:w-2/2 border-t">
                {props.children}
            </div>
        </div>
  )
}
