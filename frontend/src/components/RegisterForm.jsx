import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5173/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        console.log("Couldn't register user!");
        setLoading(false);
      }
      setUsername("");
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/api/auth/login");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="border w-86 h-[60%] px-4 py-5 flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-center">Register Form</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-6">
        <input
          className="py-3 pl-4 border w-full rounded-sm "
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

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
          {loading ? "Submitting" : "Register"}
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
