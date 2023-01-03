import Image from 'next/image'
import React, { Component } from 'react'

export default function Order(props: any) {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <div className="lg:w-2/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest"></h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #</h1>

            {/* <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p> */}

            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-4">
                      Product name
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Quantity
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-4">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    Object.keys(props.cart).map((key, ind) => {
                      return (

                        <tr key={ind} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td scope="row" className="py-4 px-6 truncate font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {props.cart[key].title.slice(0,20) + "..."}
                          </td>
                          <td className="py-4 px-6">
                            {props.cart[key].qty}
                          </td>
                          <td className="py-4 px-6">
                            {props.cart[key].category}
                          </td>
                          <td className="py-4 px-6">
                            {props.cart[key].price}
                          </td>
                        </tr>
                      )
                    })
                  }



                </tbody>
              </table>
            </div>



            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">Total Paid :{props.subTotal}</span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>

            </div>
          </div>
          {/* <Image width={100} height={100} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" /> */}
        </div>
      </div>
    </section>
  )
}
