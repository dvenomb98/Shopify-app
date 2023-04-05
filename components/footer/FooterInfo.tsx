import React, { FC } from 'react'
import { boxClasses, boxUlClasses, headerClasses } from './Footer'
import { conditionsData } from '@/consts/data'
import InternalLink from '../atoms/InternalLink'

const FooterInfo: FC = () => {
  return (
    <div className={boxClasses}>
    <h4 className={headerClasses}>Vše o nákupu</h4>
    <ul className={boxUlClasses}>
      {conditionsData.map(({label, href}) => (
        <InternalLink href={href}>
        <li>{label}</li>
        </InternalLink>
      ))}

    </ul>
  </div>
  )
}

export default FooterInfo