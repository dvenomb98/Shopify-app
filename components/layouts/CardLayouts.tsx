import classNames from 'classnames'
import React, { FC } from 'react'

export enum GridVariant {
  BASE = "base",
  FLEX = "flex",
  THREE_COLS ="three_cols"
}


interface CardsLayoutProps {
    children: React.ReactNode
    className?: string
    gridVariant?: `${GridVariant}`
}


const gridClasses = {
  [GridVariant.BASE]:
    'grid grid-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 fullhd:grid-cols-5',
  [GridVariant.FLEX]:
    'flex flex-row overflow-x-scroll hide-scrollbar',
  [GridVariant.THREE_COLS]: "grid grid-rows-auto lg:grid-cols-3 sm:grid-cols-2 gap-5"
};

const CardsLayout: FC<CardsLayoutProps> = ({children, className, gridVariant = GridVariant.BASE}) => {
  return (
    <div className={classNames(' gap-5', gridClasses[gridVariant], className)}>
        {children}
    </div>
  )
}

export default CardsLayout