import React from 'react'
import { useController } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FormMessage } from '@/components/ui/form'

const CustomInput = ({ name, label, placeholder = '', type = 'text', control }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control })

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        {...field}
        placeholder={placeholder}
        type={type}
        className={error ? 'border-red-500' : ''}
      />
      {error && <FormMessage>{error.message}</FormMessage>}
    </div>
  )
}

export default CustomInput
