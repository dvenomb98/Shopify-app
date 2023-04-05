import { EnvelopeIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { iconClasses } from '../footer/Footer'

const EmailContact: FC = () => {
  return (
    <div className="badges-contact">
    <EnvelopeIcon className={iconClasses} />
    <div>
      <p className="font-medium">mujemail@email.com</p>
      <span className="text-neutral-gray">
        Odpovídáme zpravidla do 2 dní
      </span>
    </div>
  </div>
  )
}

export default EmailContact