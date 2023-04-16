import { InstagramPhoto } from '@/types/types'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

interface IGPhotoProps {
    photo: InstagramPhoto
}

const IGPhoto: FC<IGPhotoProps> = ({photo}) => {
  return (
    <Link href={photo.permalink} target="_blank" className='h-48 aspect-square relative rounded-md'>
      <Image
        src={photo.thumbnail_url || photo.media_url}
        alt="Instagram photo"
        fill
        className='w-full h-full object-cover rounded-md' 
        sizes="100vh, 100wh"
        />
    </Link>
  )
}

export default IGPhoto