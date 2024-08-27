import React from "react";

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
          <label className="w-96">
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-md rounded-[34px]"
              />
            </label>
          </label>
          <label className="w-96">
            <label className="form-control w-full max-w-lg">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered w-full max-w-md rounded-[34px]"
              />
            </label>
          </label>
          <label className="cursor-pointer label justify-normal mt-4 w-96">
            <input
              type="checkbox"
              defaultChecked
              className="checkbox checkbox-error"
            />
            <span className="ml-3">Remember me</span>
          </label>
          <div className="mt-3 flex w-full justify-center">
            <button className="btn bg-red-600 w-full rounded-[38px]">
              Button
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
