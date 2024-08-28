import React from "react";

function InputText({
  text,
  type,
  placeholder,
  register,
  errors,
  nameForm,
  optionsForm,
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
          className="input input-bordered w-full max-w-md h-11 rounded-[34px]"
          {...register(nameForm, { ...optionsForm })}
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
