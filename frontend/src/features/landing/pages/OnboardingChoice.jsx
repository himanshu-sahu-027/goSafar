import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/gosafar.logo.png";

function OnboardingChoice() {
  return (
    <div className="min-h-dvh w-full bg-gray-100 flex justify-center">
      {/* Mobile App Container */}
      <div
        className="
          min-h-dvh
          w-full
          max-w-[430px]
          bg-white
          flex
          flex-col
          overflow-y-auto
        "
      >
        {/* Brand Header */}
        <header className="px-2 pt-6 pb-3 flex items-center justify-between">
          <img
            src={logo}
            alt="GoSafar"
            className="h-9 w-auto object-contain"
          />

          <span className="pr-4 ml-3 text-2xl font-bold text-black tracking-tight">
            GoSafar
          </span>
        </header>

        {/* Hero */}
        <section className="px-6 pt-2">
          <div
            className="
              relative
              w-full
              aspect-[16/9]
              overflow-hidden
              rounded-3xl
              bg-teal-500
            "
          >
            {/* Left glow */}
            <div
              className="
                absolute
                -bottom-12
                -left-10
                w-36
                h-36
                rounded-full
                bg-white/30
                blur-xl
              "
            />

            {/* Right glow */}
            <div
              className="
                absolute
                -top-10
                -right-8
                w-32
                h-32
                rounded-full
                bg-white/20
                blur-xl
              "
            />

            {/* Road */}
            <div
              className="
                absolute
                left-1/2
                top-[-15%]
                -translate-x-1/2
                w-[42%]
                h-[130%]
                bg-[#242424]
                rotate-[8deg]
              "
            >
              {/* Road marking */}
              <div
                className="
                  absolute
                  left-1/2
                  top-0
                  -translate-x-1/2
                  h-full
                  border-l-2
                  border-dashed
                  border-white/60
                "
              />
            </div>

            {/* Rider */}
            <div
              className="
                absolute
                left-[8%]
                top-[17%]
                w-[22%]
                aspect-square
                rounded-full
                bg-white
                flex
                items-center
                justify-center
                text-[clamp(1.5rem,7vw,2.25rem)]
                shadow-lg
                rotate-[-8deg]
              "
            >
              🚗
            </div>

            {/* Captain */}
            <div
              className="
                absolute
                right-[8%]
                top-[17%]
                w-[22%]
                aspect-square
                rounded-full
                bg-black
                flex
                items-center
                justify-center
                text-[clamp(1.5rem,7vw,2.25rem)]
                shadow-lg
                rotate-[8deg]
              "
            >
              🧑‍✈️
            </div>

            {/* Destination */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                -translate-x-1/2
                -translate-y-1/2
                w-[15%]
                aspect-square
                rounded-full
                bg-white
                border-4
                border-black
                flex
                items-center
                justify-center
                text-[clamp(1rem,4vw,1.4rem)]
                shadow-xl
              "
            >
              📍
            </div>
          </div>
        </section>

        {/* Heading */}
        <section className="px-6 pt-5">
          <h1
            className="
              text-[clamp(1.5rem,6vw,1.75rem)]
              leading-tight
              font-bold
              text-gray-900
            "
          >
            How will you use GoSafar?
          </h1>

          <p className="mt-2 text-sm leading-5 text-gray-500">
            Choose your way to travel or earn with GoSafar.
          </p>
        </section>

        {/* Choices */}
        <section className="px-6 pt-5 flex flex-col gap-3">
          {/* Rider */}
          <Link
            to="/user-home"
            className="
              group
              w-full
              p-4
              rounded-2xl
              border-2
              border-gray-200
              bg-white
              flex
              items-center
              gap-4
              no-underline
              shadow-sm
              transition-all
              duration-200
              hover:border-black
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            {/* Icon */}
            <div
              className="
                shrink-0
                w-14
                aspect-square
                rounded-xl
                bg-gray-100
                flex
                items-center
                justify-center
                text-3xl
              "
            >
              🚗
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900">
                Ride with GoSafar
              </h2>

              <p className="text-sm text-gray-500 mt-1 leading-5">
                Book a ride to your destination
              </p>
            </div>

            {/* Arrow */}
            <span
              className="
                shrink-0
                text-xl
                text-gray-500
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>

          {/* Captain */}
          <Link
            to="/captain-home"
            className="
              group
              w-full
              p-4
              rounded-2xl
              border-2
              border-gray-200
              bg-white
              flex
              items-center
              gap-4
              no-underline
              shadow-sm
              transition-all
              duration-200
              hover:border-black
              hover:shadow-md
              active:scale-[0.98]
            "
          >
            {/* Icon */}
            <div
              className="
                shrink-0
                w-14
                aspect-square
                rounded-xl
                bg-black
                flex
                items-center
                justify-center
                text-3xl
              "
            >
              🧑‍✈️
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h2 className="text-base font-semibold text-gray-900">
                Drive with GoSafar
              </h2>

              <p className="text-sm text-gray-500 mt-1 leading-5">
                Become a captain and earn on your schedule
              </p>
            </div>

            {/* Arrow */}
            <span
              className="
                shrink-0
                text-xl
                text-gray-500
                transition-transform
                duration-200
                group-hover:translate-x-1
              "
            >
              →
            </span>
          </Link>
        </section>

        {/* Footer */}
        <footer className="px-6 py-7 text-center">
          <p className="text-xs text-gray-400">
            You can change your choice later
          </p>
        </footer>
      </div>
    </div>
  );
}

export default OnboardingChoice;