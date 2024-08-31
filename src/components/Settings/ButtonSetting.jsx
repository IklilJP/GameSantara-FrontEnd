import React from "react";

export default function ButtonSetting({ handleButton }) {
  return (
    <div className="mt-6">
      <button
        onClick={handleButton}
        className="hover:before:bg-red rounded-2xl relative overflow-hidden border border-red-600 px-8 py-1 text-red-600 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-300 hover:text-white hover:shadow-red-600 hover:before:left-0 hover:before:w-full">
        <span className="relative z-10 font-bold">Ganti</span>
      </button>
    </div>
  );
}
