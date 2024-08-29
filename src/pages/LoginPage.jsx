import React, { useState } from "react";
import InputText from "../components/InputText";
import ButtonForm from "../components/ButtonForm";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchemaLogin } from "../libs/validationSchema";

function LoginPage() {
  // prettier-ignore
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchemaLogin),
  });

  const [isRememberMe, setIsRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorCredential, setErrorCredential] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    setIsLoading(true);
    setErrorCredential(null);
    try {
      const resultAction = await dispatch(
        login({
          email: data.email,
          password: data.password,
          isRememberMe,
        }),
      ).unwrap();
      console.log("User login berhasil:", resultAction);
      navigate("/");
    } catch (err) {
      if (err === "Bad credentials") {
        setErrorCredential("Email atau kata sandi salah");
      } else {
        setErrorCredential("Server error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleFocus = () => {
    setErrorCredential(null);
  };

  return (
    <div className="bg-[url('https://res.cloudinary.com/dpofjmzdu/image/upload/v1724813280/background_all.png')] h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center">
      <div className="w-[450px] max-w-lg max-h-lg bg-black px-6 py-8 rounded-xl">
        <div>
          <h3 className="w-full text-center text-3xl font-bold text-red-600">
            Log in
          </h3>
        </div>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleSubmit(handleLogin)}>
          <InputText
            text="Email"
            type="email"
            placeholder="Email anda"
            register={register}
            nameForm="email"
            errors={errors}
            credentialError={errorCredential}
            onFocus={handleFocus}
          />
          <InputText
            text="Password"
            type="password"
            placeholder="Kata sandi anda"
            register={register}
            nameForm="password"
            errors={errors}
            credentialError={errorCredential}
            handelOnFocus={handleFocus}
          />
          <div className="h-3">
            {errorCredential && (
              <span className="text-red-600">{errorCredential}</span>
            )}
          </div>
          <label className="cursor-pointer label justify-normal w-96">
            <input
              type="checkbox"
              checked={isRememberMe}
              onChange={() => setIsRememberMe(!isRememberMe)}
              className="checkbox checkbox-error"
            />
            <span className="ml-3">Remember me</span>
          </label>
          <div className="mt-3 flex w-full justify-center">
            <ButtonForm text="Masuk" isLoading={isLoading} />
          </div>
        </form>

        <div className="flex justify-center items-center mt-2 gap-x-2">
          <p>Tidak punya akun?</p>
          <Link
            to="/register"
            className="text-red-600 font-bold hover:text-red-600/70 transition mt-1">
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
