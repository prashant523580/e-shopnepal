import React from 'react'

export default function ProductContainer(props: any) {
    return (
            
    <div className="mt-6 grid grid-cols-1 px-6 max-md:px-2 gap-y-6 gap-x-2 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {props.children}
            </div>
    )
}
