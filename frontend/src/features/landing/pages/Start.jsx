import React from "react";
import { Link } from "react-router-dom";
import trafficLight from "../assets/trafficLight.png";

function Start() {
  return (
    <div className="h-dvh w-full bg-gray-100 flex justify-center overflow-hidden">
      {/* Mobile App Container */}
      <div className="h-dvh w-full max-w-[430px] bg-white flex flex-col overflow-hidden">
        {/* Illustration */}
        <div className="flex-1 min-h-0 bg-black overflow-hidden flex items-center justify-center">
          <img
            src={trafficLight}
            alt="GoSafar"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Bottom Content */}
        <div className="shrink-0 bg-white px-5 pt-5 pb-6">
          {/* Heading */}
          <h1 className="text-[22px] leading-tight font-bold text-gray-900 m-0">
            Safar with GoSafar
          </h1>

          {/* Description */}
          <p className="text-sm text-gray-500 mt-2 mb-5">
            Choose your way to ride or drive
          </p>

          {/* Continue Button */}
          <Link to="/choice" className="btn btn--primary">
            <span>Continue</span>

            <span className="btn__arrow">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Start;
