import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ToastContainer } from 'react-toastify';
import Container from '../components/Container';
export default function OrderComplete() {
  const router = useRouter()
  React.useEffect(() => {

    if (typeof window != "undefined") {
      let token: any = localStorage.getItem("token");

      if (!(token)) {
        router.push("/")
        return
      } else {
        token = JSON.parse(token)
        getOrder(token)
      }

    }

  }, [router.query])
  const getOrder = async (token: any) => {
    console.log(token)
    let res = await fetch("/api/order",{
      method:"GET",
      headers:{
        "Authorization": token
      }
    })
  }
  return (
    <Container>

    <div className="container px-5 py-24 mx-auto">
          <ToastContainer/>
      <div className="text-center mb-20">
        <h1 className="sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-4">Your Order has been successfully placed. </h1>
        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto"> Track Orders</p>
      </div>

      <Link href={"/orders"}>

        <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Orders</button>
      </Link>
    </div>
    </Container>
  )
}
