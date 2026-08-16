import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";

import useCaptainAuth from "../hooks/useCaptainAuth";

function CaptainSignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { signup, isLoading, error } = useCaptainAuth();

  const submitHandler = async (e) => {
    e.preventDefault();

    const captainData = {
      fullname: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      },

      email: email.trim(),
      password,

      vehicle: {
        color: vehicleColor.trim(),
        plate: vehiclePlate.trim(),
        capacity: vehicleCapacity,
        vehicleType,
      },
    };

    const success = await signup(captainData);

    if (success) {
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");

      setVehicleColor("");
      setVehiclePlate("");
      setVehicleCapacity("");
      setVehicleType("");
    }
  };

  return (
    <div className="h-dvh w-full bg-gray-100 flex justify-center overflow-hidden">
      {/* Mobile App Container */}
      <div className="h-dvh w-full max-w-[430px] bg-white flex flex-col justify-between px-5 pt-3 pb-6">
        <div>
          {/* Header */}
          <header className="-ml-2 pt-2 pb-6 flex items-center justify-between">
            <img
              src={logo}
              alt="GoSafar"
              className="h-8 w-auto object-contain"
            />

            <span className="pr-4 ml-3 text-2xl font-bold text-black tracking-tight">
              GoSafar
            </span>
          </header>

          <form onSubmit={submitHandler}>
            {/* Captain Name */}
            <h3 className="text-lg font-medium mb-1">
              What's our Captain's name
            </h3>

            <div className="flex gap-3 mb-3">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-1.5 border-2 border-zinc-500 text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />

              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-1.5 border-2 border-zinc-500 text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email */}
            <h3 className="text-lg font-medium mb-1">
              What's our Captain's email
            </h3>

            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#eeeeee] mb-3 rounded-lg px-3 py-1.5 border-2 border-zinc-500 w-full text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
              type="email"
              placeholder="email@example.com"
            />

            {/* Password */}
            <h3 className="text-lg font-medium mb-1">Enter Password</h3>

            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#eeeeee] mb-6 rounded-lg px-3 py-1.5 border-2 border-zinc-500 w-full text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
              type="password"
              placeholder="password"
            />

            {/* Vehicle Information */}
            <h3 className="text-lg font-medium mb-1">Vehicle Information</h3>

            <div className="flex gap-3 mb-3">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-1.5 border-2 border-zinc-500 text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="text"
                placeholder="Vehicle Color"
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />

              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-1.5 border-2 border-zinc-500 text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
            </div>

            <div className="flex gap-3 mb-9">
              <input
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-1.5 border-2 border-zinc-500 text-base placeholder:text-base focus:outline-none focus:border-cyan-500"
                type="number"
                placeholder="Vehicle Capacity"
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />

              <select
                required
                className="bg-[#eeeeee] w-1/2 rounded-lg px-3 py-1.5 border-2 border-zinc-500 text-base focus:outline-none focus:border-cyan-500"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>
                  Vehicle Type
                </option>

                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Moto</option>
              </select>
            </div>

            {/* Error */}
            {error && <p className="text-red-500 text-xs mb-3">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#111] text-white font-semibold mb-2 rounded-lg px-4 py-2 w-full text-base disabled:opacity-50"
            >
              {isLoading ? "Creating account..." : "Create Captain Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/captain-login" className="text-cyan-600">
              Login here
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div>
          <p className="text-[9px] leading-tight">
            This site is protected by reCAPTCHA and the{" "}
            <span className="underline">GoSafar Privacy Policy</span> and{" "}
            <span className="underline">Terms of Service apply</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default CaptainSignup;
