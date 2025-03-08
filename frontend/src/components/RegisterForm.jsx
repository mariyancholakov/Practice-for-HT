import React from "react";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <div className="border w-86 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">Register Form</h2>
      <form className="flex flex-col gap-6">
        <input
          className="py-3 pl-4 border w-full rounded-sm "
          type="text"
          name="username"
          placeholder="Username"
        />

        <input
          className="py-3 pl-4 border w-full rounded-sm "
          type="email"
          name="email"
          placeholder="Email"
        />

        <input
          className="py-3 pl-4 border w-full rounded-sm "
          type="password"
          name="password"
          placeholder="Password"
        />

        <button
          className="py-3 pl-4 bg-indigo-500 hover:bg-indigo-400 transition duration-300 ease-in-out cursor-pointer text-center text-white text-lg font-semibold w-full rounded-sm "
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="text-slate-700 text-center">
        Already have an account?{" "}
        <Link
          className="text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out"
          to={"/api/auth/login"}
        >
          Login
        </Link>
      </p>
      <Link
        className="text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out text-center"
        to={"/"}
      >
        Go back Home
      </Link>
    </div>
  );
}

export default RegisterForm;
