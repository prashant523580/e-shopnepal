import React, { Component } from 'react'
import CheckoutComponent from '../components/CheckoutComponent'
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Button from '@mui/material/Button';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import { generateImgUrl } from '../helpers/urlConfig';
export default function Checkout(props: any) {
  const router = useRouter();
  const [confirmAddress, setConfirmAddress] = React.useState<boolean>(false);
  const [confirmOrder, setConfirmOrder] = React.useState<boolean>(false);
  const [paymentMethod,setPaymentMethod] = React.useState<any>("COD");
  const [address, setAddress] = React.useState({
    fullname: "",
    email: "",
    phone: "",
    city: "",
    street: ''
  });
  const [user, setUser] = React.useState<any>({
    email: "",
    password: ""
  })
  let dev = process.env.NODE_ENV !== "production";
  let {DEV_URL,PROD_URL} = process.env;
  if(dev){
    console.log({DEV_URL, PROD_URL})
  }
  const inputEvent = (e: any) => {
    let { name, value } = e.target;
    setAddress((pre: any) => {
      return {
        ...pre,
        [name]: value
      }
    })
    setUser((pre: any) => {
      return {
        ...pre,
        [name]: value
      }
    })
    // console.log(user)
    // console.log(props.user.value._id)
  }
  const cartIncrement = (item: any) => {
    const { slug, qty, title, price, size, varient } = item;
    let incrementCartQuantity = {
      slug,
      qty: 1,
      title, price, size, varient,
    }
    props.addToCart(incrementCartQuantity)
  }
  const submitOrder = async () => {
    setConfirmOrder(true)
  }


  const submitAddress = () => {
    // console.log(address)
    if ((address.fullname && address.email && address.city && address.phone && address.street)) {

      setConfirmAddress(true);
    } else {
      console.log(false)

    }
  }
  const submitCOD = async () => {
    let orders = {
      address,
      userID: props.user.value.userID,
      products: props.cart,
      amount: props.subTotal,
      paymentMethod: paymentMethod,
      orderId: Math.floor(Math.random() * Date.now())
      
    }
    console.log(orders)
    let res = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify(orders),
      headers: {
        "Content-Type": "application/json"
      }
    })
    let data = await res.json();
    if (data.success) {
      toast.success(data.successs, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      router.push("/orderComplete")
      props.clearCart()
    }else if(data.error){
      // props.clearCart()
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
var path= process.env.NEXT_PUBLIC_EPAY;
var params= {
    amt: 200,
    psc: 0,
    pdc: 0,
    txAmt: 0,
    tAmt: 200,
    pid: process.env.NEXT_PUBLIC_PID,
    scd: "EPAYTEST",
    su: `${dev ? DEV_URL : PROD_URL}/esewa/success?q=su`,
    fu: `${dev ? DEV_URL : PROD_URL}/esewa/failure?q=su`
}

function post(path : any, params : any) {
  console.log(path ,params)
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
}
const loggedIn = async () => {
    // e.preventDefault()
    console.log(user)
    let res = await fetch("/api/login", {
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
      setUser({ email: "", password: "" })
      window.location.reload();
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
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
      setUser({ email: "", password: "" })
    }

}
  return (
    <section className="text-gray-600 body-font">
      <ToastContainer/>
      <div className="container px-2 mx-auto flex flex-wrap flex-col">
        <CheckoutComponent
          icon={<ContactMailIcon />}
          step={<h1>Step 1: Delivery Address</h1>}
          active={props.user.value}
        >
          {/* <!-- component --> */}
          {
            props.user.value ? <h1>User exists</h1>
              :
              <div className="flex items-center  justify-center">
                {/* <!-- Login Container --> */}
                <div className=" flex-col border bg-white px-6 py-6 shadow-md rounded-[4px] ">
                  {/* <div className="mb-8 flex justify-center">
                    <img className="w-24" src="https://assets.leetcode.com/static_assets/public/webpack_bundles/images/logo.c36eaf5e6.svg" alt="" />
                  </div> */}
                  <div className="flex flex-col text-sm rounded-md">
                    <input value={user.email} onChange={inputEvent} name='email' className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Username or Email id" />
                    <input onChange={inputEvent} name='password' className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500" type="password" placeholder="Password" />
                  </div>
                  <button onClick={loggedIn} className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit">Sign in</button>
                  {/* <div className="mt-5 flex justify-between text-sm text-gray-600">
                    <a href="#">Forgot password?</a>
                    <a href="#">Sign up</a>
                  </div>
                  <div className="flex justify-center mt-5 text-sm">
                    <p className="text-gray-400">or you can sign with</p>
                  </div>
                  <div className="mt-5 flex justify-center gap-3    ">
                    <img className="h-7 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFbUlEQVRoge1ZXWwUVRT+zszs2nZbiUARui2b1lCgJAiWFAMRIoEHFYOtqSL4wAMQGyDxwUQMmiAhSh+NbRFN1AeaQGpacZUHTIjRItLQpCApPw0GdttSUihIty3dnZnjw5T+7Nz52c4WH+j3NHvvd875zt479+cMMI1pPNmgdDjhSshDaqiMSX8ZjFIGLQIwD0D2CCUGoJvAV0FoJcinM5feaKH90L3G9pTA4Ka8Al1SdgF4F0AwRfNOAEcl0mqzGrs6J6thUgn0V87NheY/SIxtAPyTDT6COAPfsqp+8nS4+06qxiknEKsIbQHzlwBmpmrrgLsM3p3TFD2WipHrBHhnqS/W21tHwPbUtbkHA0eyc3P30NetCTd8Vwnw63lZA4r8A0CveJPnEoyTAU2tpHD3oBNVcvS1s9T3WMUDAOHVAVk5wZVLHN8vxwRivb11j1X8IxDWx9T+L5xpNoiVh7YCfDR9qlIHE2/OaYwet+q3TOBBeXCWBPkKgNlTosw9+nRVXWi1xFpOISL5M/z/4gFgpiz7PrXqFI7AYEUwX2f5Ohw2KXnZGiirXoO0uAzSrLkAAL2vB3p7C9TmMLSLzV6Ej0dcVpQFmQ3/RJI7FBFbZ3k3bMRLwSL4q6ohl5SZ+/KKIOUVQVm/GVp7C+I1H0DvuelFPAD4NVWtAvBRcodpBHg/pIEL828CyBd5kpe8iKf2fgMKPO0qsnalFQ/3vQkwp6jZhK6AEglRA7TxjaYRGLoQWgmwULwULJooPhFH4lQ91D9OQI9cNTgFxVDWlsO3YQv07usYrt6RDvEAEBxK5JcCnS22CRhHYvHi5K+qHhXPfT14eHAb9BuXJ3D0jjbEO9qg/noMfO82+EGfK3WBRmOaDVSELDk6SesA2CegM1aI5MvPvzQ25xNxofgJfm5a900WBJQmt5mWUQIVi4yV1RtHnxOn6m3FTxUYWJjcJlqF5omMpcVjK476+4/CAI+mgRX0rusY2rPOlj++TTCdTNpEG1m2oA0069nRZ4522Aq1Ao3sFR6Qk9wg3AemDPrE1Wj8P+zmJRZBlEAMgtsW370NChYBAKhgAbijzWQoCi4tfAGZnzcZPvp6UhInQL/Jv4B0S2SpXx5bvZS15a4jKmvGuHp7iw3TFUzaTAkw+JrIUm0Ojz77NmyBVFjiGE0qXALfhnfGfJwJW3IHKkKO04eAq6YYpgbCeZGxdrEZWvs544fPj4x939kmIRWWIOPj7wHFZ9hfOgvt7z9tBTqBYdYm2Afk01YO4nV7wbF/Dd7Mucis/gn+7QcgFS8HZQSAjCxIxcvh334AmYdOgJ6ZYwSO3Uf88F5P4gGAiE3arA5zNwAUiJzIJSuN81D2DFdBOXYfw4d2QPM6/5kjgWXRwuRqnnkEDEK9lR+t/RwefrgJ2qW/HGNql84aXO8vLyBRvagU6e1Cs3Q1lFUbIZWUgWYbmyTfuWVcaM6EPc/5cRiWFP25rIbOruQOyztxf/n8wwS8ly4FXkDENYHG6B5Rn+WdWFf0fQBSrlVOAe5qCc3yTmyZwIyGzj4GC7N+nGCgyq7oa1vYymmKHmPgSPpluQOBa3OaIg12HMfKXLYS2cVE4vPz1OKXrHvR951IjglQA7TsRGIrGCfTo8sVfg6o6lv0G1QnomMCAEDh7sHAnNw3GPjKuzaHWODawL1IuZvKtMFPEf0VBW8TUw3SXrWjXgbvcprzyXA1AuOR0xg9rkNbREx1AIZTtRdgmIhrNEVblKp4wOtHvsr8oK5KuwFshcXZyQZREI5Ksl4r2mHdIj2fWfdDGmrLX6GTtI6A0pHqQRATPrNSJ4GvMXCeiE9nLY22puMz6zSm8aTjPy9i6LxlaK5BAAAAAElFTkSuQmCC" />
                    <img className="h-7 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300 " src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAC40lEQVRoge3Yz4sXdRzH8Ye7pG4SsgcFpVo3kbR1PdWhLgWpl04evHmwv0FDBSMPpVR0j252kJaQWEIvIiEoopcoVsEfCf4IfyBIoZW47Xb4zPodvs5nPvPd78x6aJ7wOcx75vN6v94zn/nM5zO0tLS0tPTBogY0R7ARo1iWxR7hGqZwo4GcfTOGrwSTs4n2G77EhufitIv1mMSMtPHuNoMf8PqCu8YA9uNxRbNl7R/syzQXhGU4XoPx7vajzjvTqPkzDZifa6ebLGJAM3e+6Ek0Mpz2dyV6gjexGd9mx1VNPsFhvI+3MN11fl9VU1W/A+vxCxbnYlMYzx2PCdPjEM4KU+of2bnlWIu38Rd242Ku7wW8kTt+jE24XNFfkknP3sWzdYnjXIH+0brExxTP85fqSoArBfr/qvCxq/KyfKh4qI1gsLrHKIN4pSA+gJ016EeXB5/VIZ5xMJLjSr/Cr0aE/8Zwv+I5hjPNolwvl3VMDaHxSPwEHvTmsZQHONmjB6QLGI3Er6YczYPYcIl5QLqAlyLxO0k7vXM7El9e1ilVwHQk/mLSTu/E1kAxD0gXcD8SX5e00zuxfcG9sk6pAu5G4u9V6NsLg3g3cq60gBQrxXdb2/oR7mJ7JMcMVvQrfjEifhOr+xUX5vnfIzmmatD3eUR8Fj9LTHMJXsOvJfqH+tB+yqjOev0mtmIPHmaxP4W9wqoeNFfj46xvzPy0sN6qhaM6G5G9wuJui7BizI/XKXxSonMgu6bKX4yJuswTnsKjnPiOLL6rIPGWEp2tFYzPCk+3trs/x0e5BLd0Pjwf4BjO42ssKdEYUu3u76rbPGHYTOSSfDFPndiqc64d0cwvT7AUp3LJvhFWi4vxgmrTalkBPyl/grUwhO8Kks8IG/YUsQKOCDdoQVgkvBP5F3vW/Ap4KIz5xoZNGWvwvc534nqFPtd15vkJYdf33BnBp8J/nxTvZNfWPk22tLS0tPz/+A/3Y3+ksla8tgAAAABJRU5ErkJggg==" />
                    <img className="h-7 grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAFEklEQVRoge2ZW2gcVRjH/2c22SQ1aZLNRXNraFATvKFs0QdfTPTFiKCIQUwFwZQYkqIY8cELrKLFF2+0G4yVgpBgm4q0oO2DJvpgVUICKohtUFuSzcZoLrK7uezOzPn7kLRddmZ2ZjJJfGg+WHZ2zjnf/P7nfOc7c84CO7Zj17aJTfEyRF/TSvxuAM0SCIJsAlFFsJAECCQoGQVwgeQ4wZFL04FRhIT0+mhPAm77dLlO12Q3yf0kawCAJEgAWPte+xAmZRFKDug5Ijx9oCyyrQJuHIpX+JN4k8DTJPwWgNng0+4jBfKY7lNfi3ZWz225gFsHEk9KicMQDGQHdASfXmeeFD3RnorjWyIg2M/c1cJEn5SiwwjiGf5qHaB/JrfyIDqFumkCgv3ctXLd0mckHtxS+Kvtz/jy5ePRzuplOzbFAXzuNsMDQKu2itMI/er3LGC1MNG3zfBrZVI8UF5S+oEdX9YQumUw0U6JAS/wCoiWej/urc5FfbGCkjwFKZ1QdSKWIn6MpvDxTyuW7SX5xEJvzQnXApo+iZUJRTkPsHyj8HdW+vBecyH2FvssO+lcJIXHPl+08E0AWEhRNMZfNE+xliGkKOKQF/i7Kn0Yenh3Vvh0yxJ2gRzK1y05zW7eMbBcu75IbQjeJ4jD9xfB73OWpR3MmY7St6N7HAtQKXvoYYVtbchDbZFtfkgTkBUeJP1S0bvM2uYY7oSokIl2L9mmuS7XFHQypqN3OI5f/lavkKuSdvBrzyCfwhBfRZvQswpo2hu/h0TtRuFJ4PYKY78AwAvDcXw3lbRtb7FC1+y+GAnGgNF0n2bj3OwFniTKC4xu/1qSOLdReF7+LVsy/ZoJ2Od1kSryGyfvZEwHPcADACWCtgIkebMXeJJQTJJPPCm9wRMgZGOmX0OwkqjyAr9+aTBJR9kmax1SVGX6NQmh9W3ghuEtFMArPACwKNOj2Qi4cvzD/oAh5s1C6L76PEw8e73h/snfVvDS14tO4E1H15jviATJgBN4ACjOE6aTNtNyFaAk3zjg0bjmGJ5kPLO92SSecQpPsy5xaRPzmlN4CGDGVgCICa8T1o39vqA6ggcACVywFUBwzFW28ACvSeDPRc0R/Pr1WKYP4yQGR4zA1pP6ua9iyLncDetlRx8qMWw0fp5V8f5o/EodAFjViKQmncKDCkZsBVyaDozuqVqYAllnB08CZ/9YNZR9xBKIDAWzSzpOnV92M2EzO29SlQ3jmbzGORASEpKDTuCtyqzMAzwADJodRZq+tOs5Ikwi5eWVejPhCSZTqhY282sqYPpAWQTksc2CB4x1HMOTkMRRvNU47VgAANDvf4XknFv47CHkHp7EvC50d3tiAIh0FC+Q4qBbeLvFzSU8CHYh1Gh56Jt14xrtqThOoP9/hA/rb9x0MptP2533TGVlN8FTTuEtRbiEB/ClrkSet+OzPzpoE7ovT7aDPOPi4Wb8zuHJLzRlVxtCzZp3AQCindXLswU3PELBD+3h3Wei9PYEw5ov8ihC9ifTgNnrtJV1CnUO6Aq8M/2tAhyRRPlGFrIs8P8Q7LaL+Uxzfvq0bgu9NSeSSTaR7AOQdLMWWC1SEjiiKckmt/CAmxFIs/jLtfMAusvenTqkaegB2E6iziX8FIABVdXDVouUE9ucv1lDVHYXRPaRsoUSwe+fqWoN5Iv80gKfIgTw74qUwxeXFztOz31DcowCI6psGN+Mv1l3bMeudfsPP8EkRZOLDr8AAAAASUVORK5CYII=" />
                    <a className="bg-gray-400 h-7 w-7 rounded-3xl text-center grayscale cursor-pointer hover:grayscale-0 scale-105 duration-300 " href="">...</a>
                  </div>
                  <div className="mt-5 flex text-center text-sm text-gray-400">
                    <p>
                      This site is protected by reCAPTCHA and the Google <br />
                      <a className="underline" href="">Privacy Policy</a>  and <a className="underline" href="">Terms of Service</a>  apply.
                    </p>
                  </div> */}
                </div>
              </div>

          }
        </CheckoutComponent>
        <CheckoutComponent
          icon={<ContactMailIcon />}
          step={<h1>Step 2: Delivery Address</h1>}
          active={confirmAddress && props.user.value != null}
        >
          {
            props.user.value &&
            <>
          <div className="relative mb-4">
            <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
            <input onChange={inputEvent} value={address.fullname} type="text" id="full-name" name="fullname" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={inputEvent} value={address.email} type="email" id="email" name="email" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={inputEvent} value={address.phone} type="phone" id="Phone" name="phone" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className=" flex justify-start space-x-2 items-center">

            <div className="relative mb-4 w-half ml-2">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">city</label>
              <input onChange={inputEvent} value={address.city} type="text" id="city" name="city" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <div className="relative mb-4 w-half mr-2">
              <label htmlFor="Address" className="leading-7 text-sm text-gray-600">street</label>
              <input onChange={inputEvent} value={address.street} type="text" id="Address" name="street" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            {/* <div className="relative mb-4 ml-2">
              <label htmlFor="code" className="leading-7 text-sm text-gray-600">code</label>
              <input type="number" id="code" name="code" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div> */}
          </div>
          <Button onClick={submitAddress} style={{
            background:"gray",
            color:"white",
            marginBottom: "10px"
          }} className='bg-gray-500 text-white hover:bg-slate-600'>Submit</Button>

          </>
        }
        </CheckoutComponent>
        <CheckoutComponent
          icon={<ContactMailIcon />}
          step={<h1>Step 3: Cart Review</h1>}
          active={confirmOrder}
        >
          { confirmAddress &&
            <>
              <div className=" inset-0  ">
                <div className="inset-0 ">
                  <div className="pointer-events-none  inset-y-0  flex max-w-full">
                    <div className="pointer-events-auto">
                      <div className="flex h-full flex-col overflow-y-auto ">
                        <div className="flex-1 overflow-y-auto py-6">
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200 flex flex-wrap justify-center">

                                {
                                  Object.keys(props.cart).length == 0 &&
                                  <li className='flex py-6'>no cart items.</li>
                                }
                                {
                                  Object.keys(props.cart).length > 0 &&
                                  Object.keys(props.cart).map((key, ind) => {
                                    return (
                                      <li className="flex my-2  mx-0  bg-white  shadow-md py-3" key={ind}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <Image src={generateImgUrl(props.cart[key].imgSrc)} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." width={100} height={100} layout="responsive" className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className=" flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                            
                                                <Link className='truncate' style={{width:"180px"}} href={`/product/${props.cart[key].slug}`}>{props.cart[key].title}</Link>
                                              
                                              <p className="pl-2">Rs.{props.cart[key].price}</p>
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
                {/* <Link href="/orderComplete"> */}
                <h1 className='text-3xl'>Sub Total :Rs {props.subTotal}</h1>
                {
                Object.keys(props.cart).length > 0 &&
                   <Button onClick={submitOrder} className='bg-orange-500 text-white hover:bg-orange-600 font-bold'>Confirm </Button>
                }
                {/* </Link> */}
              </div></>
          }
        </CheckoutComponent>
        <CheckoutComponent
          icon={<ContactMailIcon />}
          step={<h1>Step 4: Payment Method:</h1>}
        >

          {
            confirmOrder &&
          <>
          <form action="https://uat.esewa.com.np/epay/main" method="POST">
          <input value={props.subTotal} name="tAmt" type="hidden"/>
    <input value={props.subTotal} name="amt" type="hidden"/>
    <input value="0" name="txAmt" type="hidden"/>
    <input value="0" name="psc" type="hidden"/>
    <input value="0" name="pdc" type="hidden"/>
    <input value="EPAYTEST" name="scd" type="hidden"/>
    <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d452" name="pid" type="hidden"/>
    <input value={`http://localhost:3000/esewa/success?q=su`} type="hidden" name="su"/>
    <input value={`http://localhost:3000/esewa/failure?q=fu`} type="hidden" name="fu"/>
            <button className='bg-white space-x-2 px-2 py-2 hover:shadow-lg rounded-lg flex justify-center items-center' type='submit'>

              <Image src={"/images/esewa.png"} alt="esewa" width={30} height={30} /> <span>E-Sewa</span>
            </button>
          </form>
            {/* <button onClick={() => post(path,params)} className='bg-white space-x-2 px-2 py-2 hover:shadow-lg rounded-lg flex justify-center items-center' type='submit'>

              <Image src={"/images/esewa.png"} alt="esewa" width={30} height={30} /> <span>E-Sewa</span>
            </button> */}
          <Button onClick={submitCOD}>COD</Button>
          </>
        }
          {/* <form action="https://uat.esewa.com.np/epay/transrec" method="GET">
    <input value="100" name="amt" type="hidden"/>
    <input value="EPAYTEST" name="scd" type="hidden"/>
    <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d457" name="pid" type="hidden"/>
    <input value="000AE01" name="rid" type="hidden"/>
    <input value="check" type="submit"/>
    </form> */}
        </CheckoutComponent>
      </div>
    </section>
  )
}
