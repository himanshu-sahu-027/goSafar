import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/goSafar.logo.png";

import useUserAuth from "../hooks/useUserAuth";

function UserSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { signup, isLoading, error } = useUserAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUser = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },
      email: email.trim(),
      password,
    };

    const success = await signup(newUser);

    if (success) {
      setEmail("");
      setFirstName("");
      setLastName("");
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
            <h3 className="text-lg font-medium mb-2">What's your name</h3>

            <div className="flex gap-4 mb-7">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border-2 border-zinc-500 text-lg placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border-2 border-zinc-500 text-lg placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

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
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="text-center">
            Already have an account?{" "}
            <Link to="/user-login" className="text-cyan-600">
              Login here
            </Link>
          </p>
        </div>

        <div>
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">Google Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserSignup;
