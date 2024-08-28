import React from "react";

function ButtonForm({ text, isLoading }) {
  return (
    <button
      className="btn bg-red-600 w-full rounded-[38px] text-white  disabled:bg-gray-700"
      disabled={isLoading}>
      {isLoading ? (
        <span className="loading loading-spinner text-info"></span>
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
}

export default ButtonForm;
