// import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { Component } from 'react'
// import { connectToDatabase } from '../lib/mongodb'

export default function Order(props: any) {
  const router = useRouter()
  const [orders, setOrders] = React.useState<any>([])
  React.useEffect(  () => {

    if(typeof window != "undefined"){
  
      
      // if (!(localStorage.getItem("token"))) {
      //   router.push("/")
      //   return
      // }
      // let user = localStorage.getItem('user');
      // if(user){
      //   user = JSON.parse(user)
      // }
    
      // let data = res.json()
      // console.log(data) 

      renderOnload();
    }
  }, [])
  const renderOnload = async () => {

    let token: any = localStorage.getItem("token");

      if (!(token)) {
        router.push("/")
        return
      } else {
        token = JSON.parse(token)
      }
      let res = await fetch("/api/order",{
        method:"GET",
        headers:{
          "Authorization": token
        }
      })
      let data = await res.json();
      setOrders(data.orders);
      // console.log(data)
  }
  
  React.useEffect(() => {
    console.log(orders);
    // orders.map((item:any) => {
    //   console.log(item)
    // })
  },[orders])
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5  mx-auto">
        {
          orders.length > 0 &&
         orders.map((order:any,ind :number) => {
            return(
             
        <div key={ind} className="lg:w-4/5 mx-auto flex flex-wrap border-b border-t shadow-md px-5 mb-5">
          <div className="lg:w-2/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">payment: status</h2>
            <h2 className="text-sm title-font text-gray-500 tracking-widest">paymentMethod: COD</h2>
            <h1 className="text-gray-900 text-1xl lg:text-3xl title-font font-medium mb-4">Order Id: { order._id}</h1>

            {/* <p className="leading-relaxed mb-4">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam inxigo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean.</p> */}

            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-2">
                      Product name
                    </th>
                    <th scope="col" className="py-3 px-2">
                      Quantity
                    </th>
                    <th scope="col" className="py-3 px-2">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-2">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
               
                    Object.keys(order.products).map((key, ind) => {
                      return (

                        <tr key={ind} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td scope="row" className="py-4 px-2 truncate font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {order.products[key].title.slice(0,20) + "..."}
                          </td>
                          <td className="py-4 px-4">
                            {order.products[key].qty}
                          </td>
                          <td className="py-4 px-4">
                            {order.products[key].category}
                          </td>
                          <td className="py-4 px-4">
                            {order.products[key].price}
                          </td>
                        </tr>
                      )
                    })
                  }



                </tbody>
              </table>
            </div>



            <div className="flex mt-5">
              <span className="title-font font-medium text-2xl text-gray-900">Total Paid :{order.amount}</span>
              <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Track Order</button>

            </div>
          </div>
          {/* <Image width={100} height={100} alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" /> */}
        </div>
         
         )
      })
          }
      </div>
    </section>
  )
}

export async function  getServerSideProps(ctx:any){
//  console.log({ctx})
  // let {db} = await connectToDatabase();
  // let orders : any = await db.collection("Orders").find({userId: user.userId});
  // console.log(orders)
 
  return{
    props:{
        
    }
  }
}
