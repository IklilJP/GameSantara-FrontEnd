import React, { useEffect, useState } from "react";
import InputText from "../components/InputText";
import ButtonForm from "../components/ButtonForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axiosInstance } from "../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { validationSchemaRegsiter } from "../libs/validationSchema";
import Alert from "../components/Alert";
import { AnimatePresence } from "framer-motion";

function RegisterPage() {
  // prettier-ignore
  const { register, handleSubmit, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchemaRegsiter),
  });
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setIsError(null);
    }, 2000);

    return () => clearTimeout(timeOut);
  }, [isError]);

  const handleRegister = async (data) => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/auth/register/user", {
        username: data.username,
        password: data.password,
        fullName: data.fullName,
        email: data.email,
      });

      console.log(response.data.data);
      navigate("/login");
    } catch (error) {
      setIsError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[url('https://res.cloudinary.com/dpofjmzdu/image/upload/v1724813280/background_all.png')] h-screen w-screen bg-cover bg-no-repeat flex justify-center items-center">
      <div className="lg:w-6/12 max-w-5xl max-h-xl shadow-lg">
        <div className="flex">
          <div className="flex-1 lg:block hidden w-52 relative bg-[url('https://res.cloudinary.com/dpofjmzdu/image/upload/v1725844638/snlqgyqiwkl3xgy1i8ha.jpg')] rounded-l-xl bg-cover bg-no-repeat bg-center">
            <div className="bg-black/30 w-full h-full"></div>
          </div>
          <div className="bg-black py-5 px-4 rounded-r-xl">
            <div>
              <h3 className="w-full text-center text-3xl font-bold text-red-600 py-3">
                Register
              </h3>
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
                errors={errors}
              />
              <InputText
                text="Username"
                type="text"
                placeholder="Nama panggilan anda"
                register={register}
                nameForm="username"
                errors={errors}
              />
              <InputText
                text="Email"
                type="email"
                placeholder="Email anda"
                register={register}
                nameForm="email"
                errors={errors}
              />
              <InputText
                text="Password"
                type="password"
                placeholder="Kata sandi anda"
                register={register}
                nameForm="password"
                errors={errors}
              />
              <InputText
                text="Confirm Password"
                type="password"
                placeholder="Konfirmasi kata sandi anda"
                register={register}
                nameForm="confirmPassword"
                errors={errors}
              />
              <div className="mt-3 flex w-full justify-center">
                <ButtonForm text="Daftar" isLoading={isLoading} />
              </div>
            </form>
            <div className="flex justify-center items-center mt-2 gap-2">
              <p>Sudah punya akun?</p>
              <Link
                to="/login"
                className="text-red-600 font-bold hover:text-red-600/70 transition">
                Masuk
              </Link>
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isError && <Alert isError={isError} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default RegisterPage;
