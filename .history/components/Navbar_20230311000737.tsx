import withRouter, { WithRouterProps } from 'next/dist/client/with-router';
import Link from 'next/link'
import React, { Component, useState } from 'react'
import styles from "../styles/Navbar.module.css";
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { generateImgUrl } from '../helpers/urlConfig';

interface PropsTypes {
  openDrawer: boolean
  navLinkRef: any,
  cartRef: any,
  cartConRef: any,
  cart: any,
  addToCart: any,
  deleteFromCart: any,
  clearCart: any,
  subTotal: any,
  user:any
}

export function DropdownMenu(props: any) {
  const [dropdown, setDropDown] = useState<boolean>(false);
  const dropdownRef = React.useRef<any>();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("click", (e) => {
        const target = e.target;
        // console.log(target === dropdownRef.current)
        // console.log(!dropdownRef!.current || !dropdownRef.current.contains(target))
        if (!dropdownRef!.current || !dropdownRef.current.contains(target)) {
          setDropDown(false)
        }
      })

      // dropdownRef.current.addEventListener("mouseenter",() => setDropDown(true));
      // dropdownRef.current.addEventListener("mouseleave", () => setDropDown(false));
    }
  }, [])
  return (
    <div  >
      <Button ref={dropdownRef}  onClick={() => setDropDown(!dropdown)} className=" text-black bg-black-700 hover:bg-black-800  focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800" type="button">{props.icon} <svg className="animate ml-2 w-4 h-4" style={{
        transform: dropdown ? "rotate(-180deg)" : "rotate(0)"
      }} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Button>
      {/* <!-- Dropdown menu --> */}
      <div className={`relative bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 `}>
        <ul style={{
          top: dropdown ? 0 : "-80px",
          transform: dropdown ? "scale(1) translateX(-50px)" : "scale(0) translateX(0)",
          // height: dropdown ? "0vh" : "auto",
          borderRadius: dropdown ? ".4em" : "50%",
          left: typeof window !== "undefined" && window.innerWidth > 600 ? -20 : -40,
          zIndex:999999999
        }} className="animate absolute shadow-xl z-50 w-40 mr-5 bg-white py-2 text-sm text-gray-700 dark:text-gray-200">
          {props.childLink.map((link: any, ind: any) => {
            return (
              <li 
               key={ind} onClick={(e: any) => {
                e.preventDefault()
                if(link.onClick){
                  link.onClick && link.onClick()
                }
              }}>
                {link.path ? <Link className="cursor-pointer mx-2 block py-2 px-8 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" href={link.path} >{link.label}</Link>
          : <span className="cursor-pointer mx-2 block py-2 px-8 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> {link.label}</span>  
        }
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}

class Navbar extends Component<any, PropsTypes, WithRouterProps> {
  constructor(props: any) {
    super(props)
    this.state = {
      openDrawer: false,
      navLinkRef: React.createRef(),
      cartRef: React.createRef(),
      cart: this.props.cart,
      addToCart: this.props.addToCart,
      deleteFromCart: this.props.deleteFromCart,
      subTotal: this.props.subTotal,
      clearCart: this.props.clearCart,
      cartConRef: React.createRef(),
      user:this.props.user
    }
    this.componentDidMount = () => {
      console.log(this.state.user)
      if (typeof window !== "undefined") {
        window.addEventListener("click", (e) => {
          const target = e.target;
          if (!this.state.navLinkRef.current || !this.state.navLinkRef.current.contains(target)) {
            this.setState({openDrawer: false})
          }
        })
      }
    }
  }

  cartIncrement = (item: any) => {
    const { slug, qty, title, price, size, varient } = item;
    let incrementCartQuantity = {
      slug,
      qty: 1,
      title, price, size, varient,
    }
    this.props.addToCart(incrementCartQuantity)
  }
  toggleCart = () => {
    if (this.state.cartConRef.current.classList.contains("translate-x-full")) {
      this.state.cartConRef.current.classList.remove("translate-x-full");
      this.state.cartConRef.current.classList.add("translate-x-0");
    }
    else if (!this.state.cartConRef.current.classList.contains("translate-x-full")) {
      this.state.cartConRef.current.classList.remove("translate-x-0");
      this.state.cartConRef.current.classList.add("translate-x-full");


    }
    console.log(this.state.cartConRef.current.classList.contains("translate-x-full"))
  }
  render(): React.ReactNode {
    let links = [
      {
        label: "home",
        path: "/"
      },
      {
        label: "tshirts",
        path: "/tshirt"
      },
      {
        label: "pants",
        path: "/pant"
      },
      {
        label: "hoodies",
        path: "/hoodies"
      },
      {
        label: "contact us",
        path: "/contact"
      }
    ]

    return (
      <>
        <header className={`bg-black text-white space-x-6 flex-wrap justify-around items-center py-10 ` + ` ${this.props.router.pathname.slice(0,6) === "/admin" ? " hidden opacity-0 -z-100" : " flex opacity-100 z-10" } `}>
        <div className="flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start">
        <div className="relative sm:w-64 w-40 space-y-5 sm:mr-4 mr-2">
          {/* <label htmlFor="footer-field" className="leading-7 text-sm text-gray-600">Placeholder</label> */}
          <input type="text" id="footer-field" placeholder='search for products' name="search" className="w-full bg-white bg-opacity-0 rounded focus:ring-2 focus:bg-transparent  text-base outline-none text-white py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
        </div>
        <button className="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded">Button</button>
       
      </div>
          <div className='flex items-center'>

          <Link href="/admin" className='border-b'>Become a Seller</Link>
        
            </div>
        </header>
        <nav ref={this.state.navLinkRef} className={` ${this.props.router.pathname.slice(0,6) === "/admin" ? " hidden " : " flex  " } `+ styles.nav + " sticky top-0 bg-gray-800" }>
          <div className={styles.logo}><Link href="/" className='text-2xl' >E-ShopNepal</Link></div>
          <div className={styles.nav_link} style={{
            right: this.state.openDrawer ? "0" : "-65%"
          }}>
            {
              links.map((link: any, i: any) => {
                return (
                  <Link
                    onClick={() => this.setState({ openDrawer: false })}
                    href={link.path}
                    className={this.props.router.pathname == link.path ? styles.link + " " + styles.active : styles.link}
                    key={link.label}>  {link.label} </Link>

                )
              })
            }
          </div>
          <div className='flex items-center justify-end' >
        
           
          <DropdownMenu icon={<AccountCircleIcon />}
              childLink={this.props.user.value == null ? [
                
                {
                  label: "login",
                  path: "/login"
                },
              ] : [
                {
                  label: "Profile",
                  path: "/user/profile"
                },
                {
                  label: "Orders ",
                  path: "/orders"
                },
                {
                  label: "Logout",
                  onClick: this.props.logout
                },
              ]}
            />
             <Button style={{
              color:"inherit",
              background: "inherit"
            }} onClick={this.toggleCart} ref={this.state.cartRef}><ShoppingCartIcon /> {Object.keys(this.props.cart).length}</Button>
            <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">

              {/* <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}

              <div ref={this.state.cartConRef} className="fixed inset-0 overflow-hidden top-0 right-0 tranform transition-transform translate-x-full">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">

                    <div className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col  bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto ">
                          <div className="flex items-start justify-between sticky top-0 bg-gray-300 px-2 py-3">
                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                            <div className="ml-3 flex h-7 items-center">
                              <button onClick={this.toggleCart} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Close panel</span>
                                {/* <!-- Heroicon name: outline/x-mark --> */}
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          <div className="mt-8 px-3">
                            <div className="flow-root">
                              <ul role="list" className="-my-6 divide-y divide-gray-200">

                                {
                                  Object.keys(this.props.cart).length == 0 &&
                                  <li>no cart items.</li>
                                }
                                {
                                  Object.keys(this.props.cart).length > 0 &&
                                  Object.keys(this.props.cart).map((key, ind) => {
                                    return (
                                      <li className="flex py-6" key={ind}>
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                          <Image src={generateImgUrl(this.props.cart[key].imgSrc)} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." width={100} height={100} layout="responsive" className="h-full w-full object-cover object-center" />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                          <div>
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                             
                                                <Link  href={`/product/${this.props.cart[key].slug}`}><h3 style={{width:"200px"}} className='truncate'>{this.props.cart[key].title}</h3></Link>
                                            
                                              <p className="ml-4">Rs.{this.props.cart[key].price}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-gray-500">{this.props.cart[key].category}</p>
                                          </div>
                                          <div className="flex flex-1 items-end justify-between text-sm">
                                            <p className="text-gray-500">Qty {this.props.cart[key].qty}</p>

                                            <div className="flex">

                                              <div className="flex space-x-2 items-center ">
                                                <button onClick={() => this.props.deleteFromCart(key, 1)} className='p-2 bg-gray-500 rounded-full w-6 h-6 text-center flex justify-center items-center'><RemoveIcon /></button>
                                                <span className='p-2  w-8 text-center'>{this.props.cart[key].qty}</span>
                                                <button
                                                  onClick={() => this.cartIncrement(this.props.cart[key])}
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

                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>Rs.{this.props.subTotal}</p>
                          </div>
                          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                          <div className="mt-6 flex space-x-2  justify-center text-center">
                            <Link href="/checkout" onClick={this.toggleCart} className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</Link>
                            <button onClick={this.props.clearCart} type="button" className="font-medium bg-red-600 px-6 py-3 rounded-md text-white hover:text-white">
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                                </div>
            
            <div className={styles.menu}>
              <Button aria-label={"menu"} onClick={() => this.setState({ openDrawer: !this.state.openDrawer })}> <MenuIcon /></Button>
            </div>
          </div>
        </nav>
      </>
    )
  }
}
export default withRouter(Navbar);


