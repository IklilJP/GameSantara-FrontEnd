import React, { useState } from "react";
import InputText from "../components/InputText";
import ButtonForm from "../components/ButtonForm";
import { useForm } from "react-hook-form";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isRememberMe, setIsRememberMe] = useState(false);

  return (
    <div className="bg-[url('https://res.cloudinary.com/dpofjmzdu/image/upload/v1724813280/background_all.png')] h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center">
      <div className="w-[450px] max-w-lg max-h-lg bg-black px-6 py-8 rounded-xl">
        <div>
          <h3 className="w-full text-center text-3xl font-bold text-red-600">
            Log in
          </h3>
        </div>
        <form action="" className="flex flex-col justify-center items-center">
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
          <label className="cursor-pointer label justify-normal mt-4 w-96">
            <input
              type="checkbox"
              defaultChecked={isRememberMe}
              value={isRememberMe}
              onClick={() => setIsRememberMe(!isRememberMe)}
              className="checkbox checkbox-error"
            />
            <span className="ml-3">Remember me</span>
          </label>
          <div className="mt-3 flex w-full justify-center">
            <ButtonForm text="Masuk" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
