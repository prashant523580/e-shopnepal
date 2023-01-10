import React from 'react'
import "node_modules/progress-tracker/src/styles/progress-tracker.css";

export default function Modal(props: any) {
    const { order, onClick, show } = props;
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

        <div
            onClick={onClick}
            style={{
                // zIndex: 1,
                background : "rgba(0,0,0,0.1)"
            }} className={`fixed transition-all shadow-sm top-0  left-0 w-full h-full ${props.show ? "  translate-y-0 " : ' -translate-y-full flex items-center justify-center flex-col'}  `}>

            <div className={`px-2 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] py-2 bg-gray-700 text-white`}>
                <div className="flex justify-between">

                    <h1> Order Id :{ order._id && order._id}</h1>
                    <div onClick={props.onClick}>close</div>
                </div>
                <div className="body py-5 px-10 overflow-y-auto">
                    {
                        order.products && Object.keys(order.products).map((key:any, ind:any) => {
                            return(
                                <div className='border-b'>
                                    <h1>{order.products[key].title}</h1>
                                </div>
                            )
                        })
                    }
                    <ul className="progress-tracker progress-tracker--text text-white">
                        {
                           order.status && order.status.map((stat: any, ind: any, arr: any) => {
                                return (
                                    <li className={`progress-step ${stat.isComplete ? "is-complete " : " "}`}>
                                        <div className="progress-marker before:bg-green-500 after:bg-green-200"></div>
                                        <div className="progress-text text-white">
                                            <h1 className='progress-title text-white'>{stat.type}</h1>
                                             <span className='text-gray-300'>
                                                {formatDate2(stat.date)}
                                                </span>

                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                 
                </div>
            </div>
        </div>
    )
}
