import Image from 'next/image'
import React from 'react'
import Container from '../components/Container'
import { generateImgUrl } from '../helpers/urlConfig';
import { connectToDatabase } from '../lib/mongodb'

export default function Order({ order }: any) {

    const formatDate2 = (date: any) => {
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        if (date) {
            const d = new Date(date);
            return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} 
        ${days[d.getDay()]}`;
        }
        return ''
    };
    return (
        <Container>
            <section className="text-gray-600 body-font">
                <div className="container px-5 mx-auto flex flex-wrap">
                    <h2 className="text-xl font-semibold title-font text-gray-800 tracking-widest">OrderID: <span className="font-bold">#{order.orderId}</span></h2>

                    <div className="flex flex-wrap w-full">
                        <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                            {
                                // Object.keys(order.products).map((key: any) => {
                                //     return (
                                //         <>  
                                //             <div className='my-6'>

                                //             <h1>{order.products[key].title}</h1>
                                //             </div>


                                //         </>
                                //     )
                                // })
                            }
                            <h1 className='mb-6 font-semibold'>Order Status </h1>
                            {
                                order.status.map((statu: any, ind: any) => {
                                    return (
                                        <div className="flex relative pb-12" key={ind}>
                                            {
                                                ind != order.status.length - 1 &&
                                                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                                                    <div className={`h-full w-1  ${statu.isCompleted ? "  bg-green-500 " : " bg-green-300 "} pointer-events-none`}></div>
                                                </div>
                                            }
                                            <div className={`flex-shrink-0 w-10 h-10 rounded-full ${statu.isCompleted ? "  bg-green-500 " : " bg-green-300 "}  inline-flex items-center justify-center text-white relative z-10`}>
                                                {/* <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                                            </svg> */}
                                            </div>

                                            <div className="flex-grow pl-4">
                                                <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider uppercase">{statu.type}</h2>
                                                <p className="leading-relaxed">{formatDate2(statu.date)}</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='lg:w-2/5 md:w-1/2 flex flex-wrap '>

                            {
                                Object.keys(order.products).map((key: any, ind: any) => {
                                    return (
                                        <div className='w-1/2 my-2' key={ind}>

                                            <h1 className='my-2'>{order.products[key].title} ({order.products[key].size}/{order.products[key].color})</h1>
                                            <div>

                                                <Image width={200} height={100} className=" object-cover object-center rounded-lg md:mt-0" src={generateImgUrl(order.products[key].imgSrc)} alt="step" />
                                            </div>
                                        </div>
                                    )

                                })}
                        </div>
                    </div>
                </div>
            </section>
        </Container>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const { db } = await connectToDatabase();
    // let dev = process.env.NODE_ENV !== "production";
    // let { DEV_URL, PROD_URL } = process.env;

    // let res = await fetch(`${dev ? DEV_URL : PROD_URL}/api/orderById`);
    let orderId = ctx.query.id;
    // await fetch(`/api/orderById`)
    // console.log(id);
    let orders = await db.collection("Orders").find().toArray();
    console.log(orderId)
    let order = orders.filter((item: any) => item.orderId == orderId);
    // console.log(order)
    return {
        props: {
            order: JSON.parse(JSON.stringify(order[0]))
        }
    }
}