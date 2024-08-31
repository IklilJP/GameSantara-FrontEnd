import React, { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchDetailUser } from "../../store/authSlice";

function FileUpload({ setIsError, setIsLoading }) {
  const [picturePreview, setPicturePreview] = useState(null);
  const [file, setFile] = useState(null);
  const dispacth = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicturePreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleUploadPicture = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("picture", file);

    try {
      await axiosInstance.patch("/user/profile-pictur", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      dispacth(fetchDetailUser());
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col py-6">
      <h2 className="font-bold text-lg  mb-5">Foto Profil</h2>
      <div className="flex items-center justify-center w-[200px] h-[200px]">
        <div className="border-4 border-dotted border-gray-700 w-full h-full p-2 flex justify-center">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full rounded-lg cursor-pointer bg-gray-500 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {picturePreview ? (
                <div className="w-[180px] h-[180px]">
                  <img
                    src={picturePreview}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <>
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
                </>
              )}
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
      <div className="mt-6">
        <button
          onClick={handleUploadPicture}
          className="hover:before:bg-red rounded-2xl relative overflow-hidden border border-red-600 px-8 py-1 text-red-600 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-red-600 before:transition-all before:duration-300 hover:text-white hover:shadow-red-600 hover:before:left-0 hover:before:w-full">
          <span className="relative z-10 font-bold">Ganti</span>
        </button>
      </div>
    </div>
  );
}

export default FileUpload;
