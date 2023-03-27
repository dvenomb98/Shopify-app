import classNames from 'classnames'
import React, { FC } from 'react'

export enum GridVariant {
  BASE = "base",
  FLEX = "flex"
}


interface ProductsLayoutProps {
    children: React.ReactNode
    className?: string
    gridVariant?: `${GridVariant}`
}


const gridClasses = {
  [GridVariant.BASE]:
    'grid grid-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 fullhd:grid-cols-5',
  [GridVariant.FLEX]:
    'flex flex-row overflow-x-scroll hide-scrollbar',
};

const ProductsLayout: FC<ProductsLayoutProps> = ({children, className, gridVariant = GridVariant.BASE}) => {
  return (
    <div className={classNames(' gap-5', gridClasses[gridVariant], className)}>
        {children}
    </div>
  )
}

export default ProductsLayout