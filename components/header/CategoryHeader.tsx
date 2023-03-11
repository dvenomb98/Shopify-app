import React, { FC } from 'react'

interface CategoryHeader {
    title: string
    description: string
}

const CategoryHeader: FC<CategoryHeader> = ({title, description}) => {
  return (
    <div className="border-default-color border-b pb-4">
      <h1 className='font-bold text-header leading-tight sm:text-h1 mb-2'>
        {title}
      </h1>
      {!!description &&  <span dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
}

export default CategoryHeader