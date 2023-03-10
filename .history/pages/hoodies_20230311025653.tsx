import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify';
import Container from '../components/Container';
import ProductCard from '../components/productCard'
import ProductContainer from '../components/ProductContainer';
import { generateImgUrl } from '../helpers/urlConfig';

export default function Hoodies(props: any) {
  const [loading, setLoading] = React.useState<boolean>(true);

  const [product, setProduct] = React.useState<any>([]);
  const [numb, setNumb] = React.useState<number>(3);
  const [loader, setLoader] = React.useState<boolean>(false);

  React.useEffect(() => {
    // console.log(props.products)
    setTimeout(() => {
      setLoading(false)
    }, 500)

    if (props.products != null) {
      let prod: any = [];
      Object.keys(props.products).map((key: any) => {
        // console.log(props.products.products[key])
        prod.push(props.products[key])
      })
      setProduct(prod)
    }
  }, [props.products])
  React.useEffect(() => {
    console.log(product)
  }, [product])
  const loadMoreData = () => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
      setNumb(numb + 4)
    }, 500)
  }
  return (
    <Container>
      <ToastContainer />
      {

        loading ?
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <h1>loading....</h1>
            </div>
          </section>
          :
          <>
            <ProductContainer>
              {
                product.length > 0 && product.slice(0, numb).map((product: any, ind: any) => {
                  return (
                    <ProductCard
                      key={ind}
                      productItem={product}
                    // slug={"/product/"+product.slug}
                    // title={product.title}
                    // price={product.price}
                    // category={product.category}
                    // imgSrc={generateImgUrl(product.imgSrc)}
                    // size ={product.size}
                    />
                  )
                })
              }


              {
                loader ?
                  <div className="loading">loading...</div> : null
              }
            </ProductContainer>
            {
              product.length > 0 ?
                numb < product.length ?
                  loader ? null :
                    <button
                      style={{
                        width: "150px",
                        margin: ".3em auto",
                        marginLeft: ".9em",
                        fontSize: "1.1em",
                        padding: ".6em .9em",
                        border: "0",
                        cursor: "pointer"
                      }}
                      onClick={loadMoreData}>load more </button> : <p className='p'>Yay! You have seen it all</p>
                : <h1 className='py-20'>product is not available now.</h1>
            }
          </>
      }
    </Container>
  )

}

export const getServerSideProps = async () => {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/products`);
  let { products } = await res.json();
  let hoodies = Object.keys(products).filter((key: any) => {
    if (products[key].category == "hoodie") {
      return products
    }
  })
    .reduce((obj: any, key: any) => {
      // console.log(key)
      obj[key] = products[key]
      return obj
    }, {})
  // console.log(pants)
  return {
    props: {
      products: hoodies
    }
  }
}
