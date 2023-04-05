import React, { FC } from 'react'
import { boxClasses, boxUlClasses, headerClasses } from './Footer'
import InternalLink from '../atoms/InternalLink'

const FooterAbout: FC = () => {
  return (
    <div className={boxClasses}>
    <h4 className={headerClasses}>O nás</h4>
    <ul className={boxUlClasses}>
        <InternalLink href={"/kontakt"}>
        <li>Kontakt</li>
        </InternalLink>
    </ul>
  </div>
  )
}

export default FooterAbout