import classNames from 'classnames'
import React, { FC } from 'react'

export enum GridVariant {
  BASE = "home",
}


interface ProductsLayoutProps {
    children: React.ReactNode
    className?: string
    gridVariant?: `${GridVariant}`
}


const gridClasses = {
  [GridVariant.BASE]:
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 fullhd:grid-cols-4',
  
};

const ProductsLayout: FC<ProductsLayoutProps> = ({children, className, gridVariant = GridVariant.BASE}) => {
  return (
    <div className={classNames('grid grid-rows-auto gap-5', gridClasses[gridVariant], className)}>
        {children}
    </div>
  )
}

export default ProductsLayout