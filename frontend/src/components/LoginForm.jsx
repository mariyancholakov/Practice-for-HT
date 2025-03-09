import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/authContext.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border w-86 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">Login Form</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <input
          className="py-3 pl-4 border w-full rounded-sm "
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="py-3 pl-4 border w-full rounded-sm "
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          className="py-3 pl-4 bg-indigo-500 hover:bg-indigo-400 transition duration-300 ease-in-out cursor-pointer text-center text-white text-lg font-semibold w-full rounded-sm "
          type="submit"
        >
          {loading ? "Submitting..." : "Login"}
        </button>
      </form>
      <p className="text-slate-700 text-center">
        Dont have an account?{" "}
        <Link
          className="text-indigo-600 hover:text-indigo-500 transition duration-300 ease-in-out text-center"
          to={"/api/auth/register"}
        >
          Register
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

export default LoginForm;
