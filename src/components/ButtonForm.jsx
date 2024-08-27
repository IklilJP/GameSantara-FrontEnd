import React from "react";

function ButtonForm({ text }) {
  return (
    <button className="btn bg-red-600 w-full rounded-[38px] text-white">
      {text}
    </button>
  );
}

export default ButtonForm;
