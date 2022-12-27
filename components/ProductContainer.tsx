import React from 'react'

export default function ProductContainer(props: any) {
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-10 md:px-6 py-8 mx-auto">
                {props.children}
            </div>
        </section>
    )
}
