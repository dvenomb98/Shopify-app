import React, { FC } from 'react'

interface PageHeader {
    title: string
    description?: string
}

const PageHeader: FC<PageHeader> = ({title, description}) => {
  return (
    <div className="border-default-color border-b pb-4">
      <h1 className='font-bold text-header leading-tight sm:text-h1 mb-2'>
        {title}
      </h1>
      {!!description &&  <span dangerouslySetInnerHTML={{ __html: description }} />}
    </div>
  );
}

export default PageHeader