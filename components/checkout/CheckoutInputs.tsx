import { CountryOptions } from '@/consts/checkout'
import React, { FC } from 'react'
import FormInput from '../form/Input'
import FormSelect from '../form/Select'


const CheckoutInputs: FC = () => {

  return (
    <div className='flex flex-col gap-4 lg:basis-2/3'>
    <FormInput name="name" label="Jméno" />
    <FormInput name="surname" label="Příjmení" />
    <FormInput name="email" label="Email" />
    <FormSelect options={CountryOptions} name="country" label="Země" />
    <FormInput name="address" label="Ulice a č.p" />
    <FormInput name="city" label="Město" />
    <FormInput name="PSC"  label="PSČ" />
    <FormInput name="phone" type="tel" label="Telefon" isOptional />
    <FormInput name="company" label="Název firmy" isOptional />
    <FormInput name="IC" label="IČ" isOptional />
    <FormInput name="DIC" label="DIČ" isOptional />
    </div>
  )
}

export default CheckoutInputs