import React from 'react'

export default function CheckoutComponent(props : any) {
  return (
        <div className="checkout">
            <div className="header w-full border-b">
            <div className={` sm:px-3 flex px-3 w-full py-3 space-x-2  justify-center sm:justify-start border-b-2 title-font font-medium ${props.active ? 'bg-green-500 border-indigo-500 text-white' :'bg-gray-100 border-indigo-500 text-indigo-500' } inline-flex items-center leading-none tracking-wider rounded-t`}>
           {props.icon}{props.step}
          </div>
            </div>
            <div className="body  mx-auto  border-t">
                {props.children}
            </div>
        </div>
  )
}
