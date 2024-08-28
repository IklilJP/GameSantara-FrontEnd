import React from "react";
import InputText from "../components/InputText";
import ButtonForm from "../components/ButtonForm";

function RegisterPage() {
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
              className="bg-cover w-[400px] h-[560px] rounded-md"
            />
            <div className="w-full h-full bg-black/20 z-10 absolute top-0 left-0"></div>
          </div>
          <form
            action=""
            className="flex flex-1 flex-col justify-center items-center pr-5">
            <InputText text="Full Name" type="text" placeholder="Nama anda" />
            <InputText
              text="Username"
              type="text"
              placeholder="Nama Julukan anda"
            />
            <InputText text="Email" type="email" placeholder="Email anda" />
            <InputText
              text="Password"
              type="password"
              placeholder="Kata sandi anda"
            />
            <InputText
              text="Confirm Password"
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
              <ButtonForm text="Daftar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
