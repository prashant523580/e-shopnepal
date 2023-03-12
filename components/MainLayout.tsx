import React from 'react'
import { useDispatch } from 'react-redux'
import { getAllProducts } from '../redux/actions/product.action';

export default function MainLayout(props:any) {
    const dispatch = useDispatch<any>();
    React.useEffect(() => {
        dispatch(getAllProducts())
    },[dispatch])
  return (
   <section>
        {props.children}
   </section>
  )
}
