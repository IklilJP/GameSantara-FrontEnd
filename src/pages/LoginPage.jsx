import React from "react";
import InputText from "../components/InputText";
import ButtonForm from "../components/ButtonForm";

function LoginPage() {
  return (
    <div className="bg-[url('https://res.cloudinary.com/dtmtphyux/image/upload/v1724723897/bg-geme-santara.jpg')] h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center">
      <div className="w-[450px] max-w-lg max-h-lg bg-black px-6 py-8 rounded-xl">
        <div>
          <h3 className="w-full text-center text-3xl font-bold text-red-600">
            Log in
          </h3>
        </div>
        <form action="" className="flex flex-col justify-center items-center">
          <InputText text="Email" type="email" placeholder="Email anda" />
          <InputText
            text="Password"
            type="password"
            placeholder="Kata sandi anda"
          />
          <label className="cursor-pointer label justify-normal mt-4 w-96">
            <input
              type="checkbox"
              defaultChecked
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
