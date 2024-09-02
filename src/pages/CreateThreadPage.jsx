import React, { useState } from "react";
import MainLayout from "../components/MainLayout";
import { MdOutlineCancel } from "react-icons/md";
import ButtonForm from "../components/ButtonForm";
import ButtonSetting from "../components/Settings/ButtonSetting";

export default function CreateThreadPage() {
  const [picturePreview, setPicturePreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicturePreview((prev) => [...prev, URL.createObjectURL(selectedFile)]);
      setFile((prev) => [...prev, selectedFile]);
    }
  };

  const handleRemoveImage = (index) => {
    setPicturePreview((prev) => prev.filter((_, i) => i !== index));

    setFile((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h2 className="font-bold text-xl text-center pb-6">Buat Thread</h2>
        <span className="border-t border-t-colorBorder w-full block"></span>
        <div className="py-6">
          <h2 className="font-bold text-lg mb-5">Judul</h2>
          <div>
            <input
              type="text"
              placeholder="Judul Thread"
              // defaultValue={defaultValue}
              // onChange={(e) => setInputValue(e.target.value)}
              className="input w-full max-w-md bg-gray-700 drop-shadow-sm border border-gray-600"
            />
          </div>
        </div>
        <div className="py-6">
          <h2 className="font-bold text-lg mb-5">Deskripsi</h2>
          <div>
            <textarea
              placeholder="Deskripsi Thread"
              className="textarea w-full max-w-md bg-gray-700 drop-shadow-sm border border-gray-600"></textarea>
          </div>
        </div>

        <div className="py-6">
          <h2 className="font-bold text-lg mb-5">Gambar</h2>
          <div className="flex items-center justify-center w-[200px] h-[200px]">
            <div className="border-4 border-dotted border-gray-700 w-full h-full p-2 flex justify-center">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-gray-500 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16">
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                    <span className="font-semibold">Click to upload</span>
                    <br /> or
                    <br />
                    <span>drag and drop</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF, JPEG
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {picturePreview.map((item, index) => (
            <div key={index} className="w-24 h-24 relative  drop-shadow-lg">
              <img
                src={item}
                alt="Gambar thread"
                className="object-cover w-24 h-24  drop-shadow-xl"
              />
              <button
                className="absolute -top-3 -right-3 hover:scale-125 transition bg-gray-800/50 rounded-full"
                onClick={() => handleRemoveImage(index)}>
                <MdOutlineCancel size={25} />
              </button>
            </div>
          ))}
        </div>

        <div>
          <div className="mt-6">
            <button
              // onClick={handleButton}
              className="px-6 py-1 border border-red-600 rounded-2xl hover:bg-softBlack transition">
              <span className="relative z-10 font-bold text-red-600 flex justify-center gap-2">
                {isLoading ? (
                  <span className="loading loading-spinner loading-md text-red-600 mx-2"></span>
                ) : (
                  "Buat"
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
