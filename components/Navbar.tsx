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

interface PropsTypes {
  openDrawer: boolean
  navLinkRef: any,
  cartRef: any,
  cartConRef: any,
  cart: any,
  addToCart: any,
  deleteFromCart: any,
  clearCart: any,
  subTotal: any
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
      <Button ref={dropdownRef} onClick={() => setDropDown(!dropdown)} className=" text-black bg-black-700 hover:bg-black-800  focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-black-600 dark:hover:bg-black-700 dark:focus:ring-black-800" type="button">{props.icon} <svg className="animate ml-2 w-4 h-4" style={{
        transform: dropdown ? "rotate(-180deg)" : "rotate(0)"
      }} aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></Button>
      {/* <!-- Dropdown menu --> */}
      <div className="relative bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
        <ul style={{
          top: dropdown ? 0 : "-80px",
          transform: dropdown ? "scale(1) translateX(-50px)" : "scale(0) translateX(0)",
          // height: dropdown ? "0vh" : "auto",
          borderRadius: dropdown ? ".4em" : "50%",
          left: typeof window !== "undefined" && window.innerWidth > 600 ? -20 : -40
        }} className="animate absolute shadow-xl z-50 w-40 mr-5 bg-white py-2 text-sm text-gray-700 dark:text-gray-200">
          {props.childLink.map((link: any, ind: any) => {
            return (
              <li key={ind}>
                <Link href={link.path} className=" mx-2 block py-2 px-8 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{link.label}</Link>
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
      cartConRef:React.createRef()
    }
    this.componentDidMount = () => {
      if (typeof window !== "undefined") {
        window.addEventListener("click", (e) => {
          const target = e.target;
          if (!this.state.navLinkRef.current || !this.state.navLinkRef.current.contains(target) ) {
            this.setState({
              openDrawer: false
            })
            // this.state.cartConRef.current.classList.remove("translate-x-0");
            // this.state.cartConRef.current.classList.add("translate-x-full");
          }
        })
      }
    }
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
  }
  cartIncrement = (item : any) => {
    const {slug, qty, title, price, size, varient} = item;
    let incrementCartQuantity = {
      slug,
      qty : 1,
      title,price,size,varient,
    }
      this.props.addToCart(incrementCartQuantity)
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

        <nav ref={this.state.navLinkRef} className={styles.nav +" sticky top-0"}>
          <div className={styles.logo}><Link href="/" >E-ShopNepal</Link></div>
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

            <Link ref={this.state.cartRef} href="#" onClick={this.toggleCart}><ShoppingCartIcon /> {Object.keys(this.props.cart).length}</Link>
            <div ref={this.state.cartConRef} className="bg-white shadow-lg py-1 px-2 flex flex-col h-[100vh] w-72  text-black fixed z-10 top-0 right-0 tranform transition-transform translate-x-full">
              <div className="flex align-middle justify-between bg-gray p-1">

                <h2 className='text-xl font-bold'>Sopping Carts</h2>
                <span onClick={this.toggleCart} className=' cursor-pointer text-2xl '>x</span>
              </div>
              <ul className='p-2'>
                {
                  Object.keys(this.props.cart).length == 0 &&
                  <li>no cart items.</li>
                }
                {
                  Object.keys(this.props.cart).length > 0 &&
                  Object.keys(this.props.cart).map((key, ind) => {
                    return (
                      <li className='flex justify-between items-center bg-gray-800 my-1 text-white p-2' key={ind}>
                        <div className="grid">

                          <h1 className='capitalize'> {this.props.cart[key].title}</h1>
                          <p>Price: {this.props.cart[key].price}</p>
                        </div>
                        <div className="flex space-x-2 items-center ">
                          <button onClick={() => this.props.deleteFromCart(key, 1)} className='p-2 bg-gray-500 rounded-full w-6 h-6 text-center flex justify-center items-center'><RemoveIcon /></button>
                          <span className='p-2  w-8 text-center'>{this.props.cart[key].qty}</span>
                          <button
                          onClick={() => this.cartIncrement(this.props.cart[key])} 
                          className='p-2 bg-gray-500 rounded-full w-6 h-6 flex justify-center items-center'><AddIcon /></button>
                        </div>
                      </li>
                    )
                  })
                }


              </ul>
              <div className="flex justify-center space-x-2 ">
                <Link href={"/checkout"} className='p-2 bg-orange-600 text-white capitalize rounded-sm'>checkout</Link>
                <button onClick={() => this.props.clearCart} className='p-2 bg-red-600 text-white capitalize rounded-sm'>clear</button>
              </div>
            </div>
            <DropdownMenu icon={<AccountCircleIcon />}
              childLink={true ?[
               
                {
                  label: "login",
                  path: "/login"
                },
              ] :[
                {
                  label: "Profile",
                  path: "/user/profile"
                },
                {
                  label: "Orders ",
                  path: "/order"
                },
                {
                  label: "Logout",
                  path: "/"
                },
              ]}
            />
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


