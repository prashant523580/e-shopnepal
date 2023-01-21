import Button from '@mui/material/Button'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { Component } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
  const [user, setUser] = React.useState<any>({
    name: "",
    email: "",
    password: ""
  })
  const router = useRouter()
  React.useEffect(() => {

    if (localStorage.getItem("token")) {
      router.push("/")
    }
  }, [])
  const inputEvent = (e: any) => {
    let { name, value } = e.target;
    setUser((pre: any) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  const submitForm = async (e: any) => {
    e.preventDefault()
    console.log(user)
    let res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    })
    let data = await res.json()
    if (data.success) {
      toast.success(data.success, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      setUser({ email: "", name: "", password: "" })
      // localStorage.setItem("user", JSON.stringify(data.user));
      // localStorage.setItem("token", JSON.stringify(data.token));
      router.push("/login")
    } else {

      toast.error(data.error, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    }

  }
  return (
    <div className="flex min-h-full items-center justify-center  px-4 sm:px-6 lg:px-4">
      <ToastContainer />
      <div className="w-full max-w-md space-y-8">
        <div>
          <Image width={100} height={100} className="mx-auto h-12 w-auto" src="/favicon.ico" alt="Your Company" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up to your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> Login</Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="full-name" className="sr-only">Full Name</label>
              <input value={user.name} onChange={inputEvent} id="full-name" name="name" type="text" autoComplete="name" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input value={user.email} onChange={inputEvent} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input value={user.password} onChange={inputEvent} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
            </div>
          </div>



          <div>
            <Button onClick={submitForm} type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
              </span>
              Sign up
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
