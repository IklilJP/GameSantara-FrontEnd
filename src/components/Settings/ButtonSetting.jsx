import React from "react";

export default function ButtonSetting({ handleButton, isLoading }) {
  return (
    <div className="mt-6">
      <button
        onClick={handleButton}
        className="px-6 py-1 border border-red-600 rounded-2xl hover:bg-softBlack transition">
        <span className="relative z-10 font-bold text-red-600 flex justify-center gap-2">
          {isLoading ? (
            <span className="loading loading-spinner loading-md text-red-600 mx-2"></span>
          ) : (
            "Ganti"
          )}
        </span>
      </button>
    </div>
  );
}
