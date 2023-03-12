import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { boxClasses, headerClasses, iconClasses } from './Footer'

const FooterContact = () => {
  return (
    <div className={boxClasses}>
          <h4 className={headerClasses}>Chcete se na něco zeptat?</h4>
          <div className="flex items-center gap-4">
            <PhoneIcon className={iconClasses} />
            <div>
              <p className="font-medium">+ 420 774 500 143</p>
              <span className="text-neutral-gray">
                Volejte Po–Pá: 8:00–20:00
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <EnvelopeIcon className={iconClasses} />
            <div>
              <p className="font-medium">mujemail@email.com</p>
              <span className="text-neutral-gray">
                Odpovídáme zpravidla do 2 dní
              </span>
            </div>
          </div>
        </div>
  )
}

export default FooterContact