import React, { useState } from "react";
import InputText from "../components/InputText";
import ButtonForm from "../components/ButtonForm";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    setIsLoading(true);

    try {
      await axiosInstance.post("/auth/register/user", {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url('https://res.cloudinary.com/dpofjmzdu/image/upload/v1724813280/background_all.png')] h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center">
      <div className="w-[100%] max-w-4xl max-h-lg bg-black pl-10 py-8 rounded-xl">
        <div>
          <h3 className="w-full text-center text-3xl font-bold text-red-600">
            Register
          </h3>
        </div>
        <div className="flex pt-8">
          <div className="flex-1 relative">
            <img
              src="https://res.cloudinary.com/dpofjmzdu/image/upload/v1724813278/background_Register.jpg"
              className="bg-cover w-[400px] h-[580px] rounded-md"
            />
            <div className="w-full h-full bg-black/20 z-10 absolute top-0 left-0"></div>
          </div>
          <form
            onSubmit={handleSubmit(handleRegister)}
            className="flex flex-1 flex-col justify-center items-center pr-5">
            <InputText
              text="Full Name"
              type="text"
              placeholder="Nama anda"
              register={register}
              nameForm="fullName"
              optionsForm={{
                required: "Nama lengkap diperlukan",
                validate: {
                  noStartingSpace: (value) =>
                    !value.startsWith(" ") || "Tidak boleh ada spasi di awal",
                },
                minLength: {
                  value: 4,
                  message: "Password minimal 4 karakter",
                },
                maxLength: {
                  value: 35,
                  message: "Password maksimal 35 karakter",
                },
              }}
              errors={errors}
            />
            <InputText
              text="Username"
              type="text"
              placeholder="Nama panggilan anda"
              register={register}
              nameForm="username"
              optionsForm={{
                required: "username diperlukan",
                validate: {
                  noStartingSpace: (value) =>
                    !value.startsWith(" ") || "Tidak boleh ada spasi di awal",
                  mustBeLowercase: (value) =>
                    value === value.toLowerCase() ||
                    "Nama panggilan harus menggunakan huruf kecil",
                },
                minLength: {
                  value: 4,
                  message: "Password minimal 4 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Password maksimal 20 karakter",
                },
              }}
              errors={errors}
            />
            <InputText
              text="Email"
              type="email"
              placeholder="Email anda"
              register={register}
              nameForm="email"
              optionsForm={{
                required: "Email harus terisi",
                validate: {
                  noStartingSpace: (value) =>
                    !value.startsWith(" ") || "Tidak boleh ada spasi di awal",
                },
              }}
              errors={errors}
            />
            <InputText
              text="Password"
              type="password"
              placeholder="Kata sandi anda"
              register={register}
              nameForm="password"
              optionsForm={{
                required: "Password harus terisi",
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Password maksimal 20 karakter",
                },
                validate: {
                  noStartingSpace: (value) =>
                    !value.startsWith(" ") || "Tidak boleh ada spasi di awal",
                },
              }}
              errors={errors}
            />
            <InputText
              text="Confirm Password"
              type="password"
              placeholder="Konfirmasi kata sandi anda"
              register={register}
              nameForm="confirmPassword"
              optionsForm={{
                required: "Konfirmasi password diperlukan",
                minLength: {
                  value: 8,
                  message: "Password minimal 8 karakter",
                },
                maxLength: {
                  value: 20,
                  message: "Password maksimal 20 karakter",
                },
                validate: {
                  noStartingSpace: (value) =>
                    !value.startsWith(" ") || "Tidak boleh ada spasi di awal",
                  matches: (value) => {
                    const password = getValues("password");
                    return value === password || "Password tidak cocok";
                  },
                },
              }}
              errors={errors}
            />
            <div className="mt-5 flex w-full justify-center">
              <ButtonForm text="Daftar" isLoading={isLoading} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
