import React from 'react'

const FormInput = ({ label, placeholder, name, type = "text", hint, required }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {hint && <p className="text-sm text-gray-500 mt-1">{hint}</p>}
    </div>
  )
}

export default FormInput