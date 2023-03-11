import React, { FC } from 'react'

interface ProductsPageLayoutProps {
    children: React.ReactNode
}

const ProductsPageLayout: FC<ProductsPageLayoutProps>= ({children}) => {
  return (
    <div className='flex sm:flex-col items-start justify-between gap-5 lg:divide-default'>
        {children}
    </div>
  )
}

export default ProductsPageLayout