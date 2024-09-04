import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout";
import { MdOutlineCancel } from "react-icons/md";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axiosInstance";
import Alert from "../components/Alert";
import { AnimatePresence } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationCreateThread } from "../libs/validationSchema";
import { PiInfo, PiInfoLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function CreateThreadPage() {
  // prettier-ignore
  const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm({
    resolver: yupResolver(validationCreateThread),
  });
  const [tags, setTags] = useState([]);
  const [picturePreview, setPicturePreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const file = watch("file", []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPicturePreview((prev) => [...prev, URL.createObjectURL(selectedFile)]);
      setValue("file", [...file, selectedFile]);
    }
  };

  const handleRemoveImage = (index) => {
    setPicturePreview((prev) => prev.filter((_, i) => i !== index));
    setValue(
      "file",
      file.filter((_, i) => i !== index),
    );
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsError(null);
      setIsSuccess(null);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [isError, isSuccess]);

  useEffect(() => {
    axiosInstance
      .get("/tags")
      .then((res) => setTags(res.data.data))
      .catch((error) => console.log(error));
  }, []);

  const onSubmit = (data) => {
    setIsLoading(true);

    const formData = new FormData();

    const postCreateRequest = JSON.stringify({
      title: data.title,
      body: data.description,
      tagId: data.tag,
    });

    formData.append(
      "postCreateRequest",
      new Blob([postCreateRequest], { type: "application/json" }),
    );

    if (data.file && data.file.length > 0) {
      data.file.forEach((file) => formData.append("pictures", file));
    }

    axiosInstance
      .post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status === 201) {
          setIsSuccess("Berhasil buat thread");
        }
        navigate("/");
      })
      .catch((error) => {
        if (error.response.status === 413) {
          setIsError("Ukuran Gambar minimal 2mb");
        } else {
          console.log(error.response.data);
          setIsError(error.response?.data?.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <MainLayout>
      <div className="py-8">
        <h2 className="font-bold text-xl text-center pb-6">Buat Thread</h2>
        <span className="border-t border-t-colorBorder w-full block"></span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-6">
            <h2 className="font-bold text-lg mb-5">Judul</h2>
            <div className="flex flex-col">
              <input
                type="text"
                placeholder="Judul Thread"
                className="input w-full max-w-md bg-gray-700 drop-shadow-sm border border-gray-600"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-red-500 flex items-center gap-1">
                  <PiInfo />
                  {errors.title.message}
                </span>
              )}
            </div>
          </div>
          <div className="py-6">
            <h2 className="font-bold text-lg mb-5">Deskripsi</h2>
            <div className="flex flex-col">
              <textarea
                placeholder="Deskripsi Thread"
                className="textarea w-full max-w-md bg-gray-700 drop-shadow-sm border border-gray-600"
                {...register("description")}></textarea>
              {errors.description && (
                <span className="text-red-500 flex items-center gap-1">
                  <PiInfo />
                  {errors.description.message}
                </span>
              )}
            </div>
          </div>

          <div className="py-6">
            <h2 className="font-bold text-lg mb-5">Tag</h2>
            <select
              className="select w-full max-w-md bg-gray-700"
              {...register("tag")}>
              <option hidden>Pilih Tag</option>
              {tags.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.tag && (
              <span className="text-red-500 flex items-center gap-1">
                <PiInfo />
                {errors.tag.message}
              </span>
            )}
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
                      <span className="font-semibold">Klik Untuk Upload</span>
                      <br /> atau
                      <br />
                      <span>drag dan drop</span>
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
                    multiple
                  />
                </label>
              </div>
            </div>
            {errors.file && (
              <span className="text-red-500">{errors.file.message}</span>
            )}
          </div>

          <div className="flex gap-4">
            {picturePreview.map((item, index) => (
              <div key={index} className="w-24 h-24 relative drop-shadow-lg">
                <img
                  src={item}
                  alt="Gambar thread"
                  className="object-cover w-24 h-24 drop-shadow-xl"
                />
                <button
                  className="absolute -top-3 -right-3 hover:scale-125 transition bg-gray-800/50 rounded-full"
                  onClick={() => handleRemoveImage(index)}
                  type="button">
                  <MdOutlineCancel size={25} />
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="mt-6">
              <button
                type="submit"
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
        </form>

        <AnimatePresence>
          {isError || isSuccess ? (
            <Alert isSuccess={isSuccess} isError={isError} />
          ) : (
            ""
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}
