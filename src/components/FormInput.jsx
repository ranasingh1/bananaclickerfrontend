import React from "react";

const FormInput = ({ id, label, type, name, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-600 mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      type={type}
      id={id}
      value={value}
      name={name}
      onChange={onChange}
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
);

export default FormInput;
