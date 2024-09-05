import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { useDispatch } from "react-redux";
import { fetchDetailUser } from "../../store/authSlice";
import ButtonSetting from "./ButtonSetting";

function UpdateProfilePicture({ setIsError, setIsSuccess }) {
  const [picturePreview, setPicturePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicturePreview(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    }
  };

  const handleUploadPicture = async () => {
    if (!file) {
      setIsError("Tidak ada gambar yang dipilih");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await axiosInstance.patch(
        "/user/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(response.data.status);

      if (response.data.status === 200) {
        setIsSuccess("Profile Berhasil Diperbarui");
      }

      dispatch(fetchDetailUser());
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
                    <span className="font-semibold">Klik untuk upload</span>
                    <br /> atau
                    <br />
                    <span>drag dan drop</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF, JPEG
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Max 2Mb
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
      <ButtonSetting handleButton={handleUploadPicture} isLoading={isLoading} />
    </div>
  );
}

export default UpdateProfilePicture;
