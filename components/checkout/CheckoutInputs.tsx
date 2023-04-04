import { CountryOptions } from '@/consts/checkout'
import React, { FC } from 'react'
import FormInput from '../form/Input'
import FormSelect from '../form/Select'

const CheckoutInputs: FC = () => {

  return (
    <div className='flex flex-col gap-4 lg:basis-2/3'>
    <FormInput name="customer.name" label="Jméno" />
    <FormInput name="customer.surname" label="Příjmení" />
    <FormInput name="customer.email" label="Email" />
    <FormSelect options={CountryOptions} name="customer.country" label="Země" />
    <FormInput name="customer.address" label="Ulice a č.p" />
    <FormInput name="customer.city" label="Město" />
    <FormInput name="customer.PSC"  label="PSČ" />
    <FormInput name="customer.phone" type="tel" label="Telefon" isOptional />
    <FormInput name="customer.company" label="Název firmy" isOptional />
    <FormInput name="customer.IC" label="IČ" isOptional />
    <FormInput name="customer.DIC" label="DIČ" isOptional />
    </div>
  )
}

export default CheckoutInputs