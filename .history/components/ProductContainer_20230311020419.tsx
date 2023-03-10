import React from 'react'

export default function ProductContainer(props: any) {
    return (
        <section className="text-gray-600 body-font">
            
    <div className="mt-6 grid grid-cols-1 px-6 gap-y-6 gap-x-3 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-6">
                {props.children}
            </div>
        </section>
    )
}
