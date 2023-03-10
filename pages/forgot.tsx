import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Forgot() {
  const router = useRouter();
  const [confirmResetPassword, setConfirmResetPassword] = React.useState<any>({
    password: "",
    cpassword: ""
  })
  const [email, setEmail] = React.useState<any>("")
  React.useEffect(() => {

    if (localStorage.getItem("token")) {
      router.push("/")
    }
    console.log(router.query.token)
  }, [router])
  const inputEvent = (e: any) => {
    let { name, value } = e.target;
    setConfirmResetPassword((pre: any) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  const sendConfirmationEmail = async () => {
    if(!email){
      console.log("fill email")
      return
    }
    let res = await fetch("/api/forgot",{
      method:"POST",
      body:JSON.stringify({email}),
      headers:{
        "Content-Type":"application/json"
      }
    })
  }
  const resetPassword = async ( ) => {
    const payload = {
      password : confirmResetPassword.password,
      token: "tokennusjjksdf"
    }
    let res =  await fetch("/api/forgot",{
      method:"PUT",
      body:JSON.stringify(payload),
      headers:{
        "Content-Type":"application/json"
      }
    })
    let data = await res.json();
    console.log(data)
      console.log(confirmResetPassword)
  }
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        {/* <Image width={100} height={100} className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/> */}
        <h1 className='text-center'>Logo</h1>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Forgot Password?</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or
          <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500"> sign in</Link>
        </p>
      </div>
      {router.query.token &&
        <div>
            <div>
            <label htmlFor="password" className="sr-only">password</label>
            <input value={confirmResetPassword.password} onChange={inputEvent} id="password" name="password" type="password" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="password"/>
          </div>
            <div>
            <label htmlFor="cpassword" className="sr-only">confirm password</label>
            <input value={confirmResetPassword.cpassword} onChange={inputEvent} id="cpassword" name="cpassword" type="password" required className="relative block w-full appearance-none rounded-none  border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="confirm password"/>
          </div>
          <div>
          <button disabled={confirmResetPassword.password != confirmResetPassword.cpassword} onClick={resetPassword} type="submit" className="group rounded-none rounded-b-md  relative flex w-full justify-center  border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-red-600">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
           
              <svg className="h-5 w-5 text-indigo-100 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </span>
            Confirm
          </button>
        </div>
        </div>
      }
      {
        !router.query.token && 
      <div className="mt-8 ">
        <input type="hidden" name="remember" value="true"/>
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input value={email} onChange={(e)  => setEmail(e.target.value)} id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
          </div>
       
        </div>
  
     
  
        <div>
          <button onClick={sendConfirmationEmail} type="submit" 
           className="group relative flex w-full justify-center rounded-none rounded-b-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
           
              <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
              </svg>
            </span>
            Confirm
          </button>
        </div>
      </div>
      }
    </div>
  </div>
  )
}
