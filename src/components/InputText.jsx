import React from "react";

function InputText({ text, type, placeholder }) {
  return (
    <label className="w-96">
      <label className="form-control w-full max-w-lg">
        <div className="label">
          <span className="label-text">{text}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-md rounded-[34px]"
        />
      </label>
    </label>
  );
}

export default InputText;
