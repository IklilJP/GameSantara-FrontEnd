import React from "react";

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
  return (
    <div className="w-96">
      <label className="form-control w-full max-w-lg h-[100px]">
        <div className="label">
          <span className="label-text">{text}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          {...register(nameForm)}
          onFocus={handelOnFocus}
          className={`input input-bordered w-full max-w-md h-11 rounded-[34px] ${
            errors[nameForm] || credentialError ? "border border-red-400" : ""
          }`}
        />
        {errors[nameForm] && (
          <span className="text-red-500 text-sm mt-1 ml-3">
            {errors[nameForm].message}
          </span>
        )}
      </label>
    </div>
  );
}

export default InputText;
