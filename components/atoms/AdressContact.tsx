import { BuildingStorefrontIcon } from '@heroicons/react/24/outline'
import React, { FC } from 'react'
import { iconClasses } from '../footer/Footer'

const AdressContact: FC = () => {
  return (
    <div className="badges-contact">
			<BuildingStorefrontIcon className={iconClasses} />
			<div>
				<p className="font-medium">Böhmova 2047/11</p>
				<span className="text-neutral-gray">621 00 Brno-Řečkovice a Mokrá Hora</span>
			</div>
		</div>
  )
}

export default AdressContact