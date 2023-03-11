import classNames from 'classnames'
import React, { FC } from 'react'

export enum GridVariant {
  HOME = "home",
  PRODUCTS = "products"
}


interface ProductsLayoutProps {
    children: React.ReactNode
    className?: string
    gridVariant?: `${GridVariant}`
}


const gridClasses = {
  [GridVariant.PRODUCTS]:
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  [GridVariant.HOME]:
    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 fullhd:grid-cols-4',
  
};

const ProductsLayout: FC<ProductsLayoutProps> = ({children, className, gridVariant = GridVariant.PRODUCTS}) => {
  return (
    <div className={classNames('grid grid-rows-auto gap-5', gridClasses[gridVariant], className)}>
        {children}
    </div>
  )
}

export default ProductsLayout