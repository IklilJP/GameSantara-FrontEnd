import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

function InputText({
  text,
  type,
  placeholder,
  register,
  nameForm,
  errors,
  onFocus,
  credentialError,
  handelOnFocus,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="lg:w-96 w-72 relative">
      <label className="form-control w-full max-w-lg h-[100px]">
        <div className="label">
          <span className="label-text">{text}</span>
        </div>
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          {...register(nameForm)}
          onFocus={handelOnFocus}
          className={`input input-bordered w-full max-w-md h-11 rounded-[34px] ${
            errors[nameForm] || credentialError ? "border border-red-400" : ""
          }`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2">
            {showPassword ? (
              <IoEyeOff className="w-5 h-5 text-gray-500" />
            ) : (
              <IoEye className="w-5 h-5 text-gray-500" />
            )}
          </button>
        )}
        {errors[nameForm] && (
          <span className="text-red-500 text-sm mt-1 ml-3">
            {errors[nameForm].message}
          </span>
        )}
      </label>
      {credentialError && (
        <span className="text-red-500 text-sm mt-1 ml-3">
          {credentialError}
        </span>
      )}
    </div>
  );
}

export default InputText;
