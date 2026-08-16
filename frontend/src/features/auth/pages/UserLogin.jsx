import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/goSafar.logo.png";

import useUserAuth from "../hooks/useUserAuth";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useUserAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email.trim(),
      password,
    };

    const success = await login(credentials);

    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="h-dvh w-full bg-gray-100 flex justify-center overflow-hidden">
      {/* Mobile App Container */}
      <div className="h-dvh w-full max-w-[430px] bg-white flex flex-col justify-between px-5 pt-5 pb-6">
        <div>
          <header className="-ml-2 pt-3 pb-6 flex items-center justify-between">
            <img
              src={logo}
              alt="GoSafar"
              className="h-9 w-auto object-contain"
            />

            <span className="pr-4 ml-3 text-2xl font-bold text-black tracking-tight">
              GoSafar
            </span>
          </header>

          <form onSubmit={submitHandler}>
            <h3 className="text-lg font-medium mb-2">What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border-2 border-zinc-500 w-full text-lg placeholder:text-base focus:outline-none focus:border-cyan-500"
              type="email"
              placeholder="email@example.com"
            />

            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border-2 border-zinc-500 w-full text-lg placeholder:text-base focus:outline-none focus:border-cyan-500"
              type="password"
              placeholder="password"
            />

            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center">
            New here?{" "}
            <Link to="/user-signup" className="text-cyan-600">
              Create new Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
