import { Link } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";

function OnboardingChoice() {
  return (
    <div className="flex min-h-dvh w-full justify-center overflow-hidden bg-slate-900">
      {/* =========================================================
          MOBILE APP CONTAINER
      ========================================================= */}

      <div className="flex min-h-dvh w-full max-w-[430px] flex-col overflow-y-auto bg-slate-100">
        {/* =======================================================
            HEADER
        ======================================================= */}

        <header className="flex h-[68px] shrink-0 items-center justify-between border-b border-slate-100 bg-white px-5">
          <img
            src={logo}
            alt="GoSafar"
            className="ml-[-14px] h-11 w-auto object-contain"
          />

          <div className="flex items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />

            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700">
              Welcome
            </span>
          </div>
        </header>

        {/* =======================================================
            MAIN CONTENT
        ======================================================= */}

        <main className="flex-1 px-5 pb-6">
          {/* =====================================================
              HERO
          ===================================================== */}

          <section className="pt-4">
            <div
              className="
                relative
                h-[190px]
                w-full
                overflow-hidden
                rounded-[28px]
                bg-cyan-600
                shadow-[0_12px_35px_rgba(8,145,178,0.20)]
              "
            >
              {/* Background circles */}

              <div className="absolute -left-12 -bottom-14 h-40 w-40 rounded-full bg-white/10" />

              <div className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-white/10" />

              <div className="absolute right-[18%] bottom-[-45px] h-28 w-28 rounded-full border border-white/10" />

              {/* Road */}

              <div
                className="
                  absolute
                  left-1/2
                  top-[-20%]
                  h-[145%]
                  w-[34%]
                  -translate-x-1/2
                  rotate-[8deg]
                  bg-slate-900
                "
              >
                {/* Road center line */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-0
                    h-full
                    -translate-x-1/2
                    border-l-2
                    border-dashed
                    border-white/50
                  "
                />
              </div>

              {/* Rider */}

              <div
                className="
                  absolute
                  left-[9%]
                  top-[22%]
                  flex
                  h-[58px]
                  w-[58px]
                  rotate-[-8deg]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/70
                  bg-white
                  text-cyan-600
                  shadow-xl
                "
              >
                <i className="ri-car-line text-3xl" />
              </div>

              {/* Captain */}

              <div
                className="
                  absolute
                  right-[9%]
                  top-[22%]
                  flex
                  h-[58px]
                  w-[58px]
                  rotate-[8deg]
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-900
                  text-white
                  shadow-xl
                "
              >
                <i className="ri-steering-2-line text-3xl" />
              </div>

              {/* Destination */}

              <div
                className="
                  absolute
                  left-1/2
                  top-1/2
                  flex
                  h-12
                  w-12
                  -translate-x-1/2
                  -translate-y-1/2
                  items-center
                  justify-center
                  rounded-full
                  border-[4px]
                  border-white
                  bg-emerald-500
                  text-white
                  shadow-[0_8px_25px_rgba(15,23,42,0.30)]
                "
              >
                <i className="ri-map-pin-fill text-xl" />
              </div>

              {/* Route dots */}

              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-white" />

                <span className="text-[10px] font-semibold text-white">
                  Your journey starts here
                </span>
              </div>
            </div>
          </section>

          {/* =====================================================
              INTRODUCTION
          ===================================================== */}

          <section className="pt-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-cyan-600">
              Welcome to GoSafar
            </p>

            <h1 className="mt-1.5 text-[20px] font-bold leading-8 tracking-tight text-slate-900">
              How would you like to use GoSafar?
            </h1>
          </section>

          {/* =====================================================
              OPTIONS
          ===================================================== */}

          <section className="mt-6 space-y-3">
            {/* ===================================================
                RIDE OPTION
            =================================================== */}

            <Link
              to="/user-home"
              className="
                group
                flex
                w-full
                items-center
                gap-4
                rounded-[24px]
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_5px_18px_rgba(15,23,42,0.05)]
                transition
                duration-200
                hover:border-cyan-300
                hover:shadow-[0_8px_25px_rgba(8,145,178,0.10)]
                active:scale-[0.98]
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-cyan-50
                  text-cyan-600
                "
              >
                <i className="ri-car-line text-2xl" />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-bold text-slate-900">
                    Ride with GoSafar
                  </h2>

                  <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-cyan-600">
                    Rider
                  </span>
                </div>

                <p className="mt-1 text-xs leading-4 text-slate-500">
                  Book a comfortable ride to your destination.
                </p>
              </div>

              {/* Arrow */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-50
                  text-slate-500
                  transition
                  group-hover:bg-cyan-50
                  group-hover:text-cyan-600
                "
              >
                <i className="ri-arrow-right-line text-lg" />
              </div>
            </Link>

            {/* ===================================================
                CAPTAIN OPTION
            =================================================== */}

            <Link
              to="/captain-home"
              className="
                group
                flex
                w-full
                items-center
                gap-4
                rounded-[24px]
                border
                border-slate-200
                bg-white
                p-4
                shadow-[0_5px_18px_rgba(15,23,42,0.05)]
                transition
                duration-200
                hover:border-slate-300
                hover:shadow-[0_8px_25px_rgba(15,23,42,0.10)]
                active:scale-[0.98]
              "
            >
              {/* Icon */}

              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-slate-900
                  text-white
                "
              >
                <i className="ri-steering-2-line text-2xl" />
              </div>

              {/* Content */}

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-[15px] font-bold text-slate-900">
                    Drive with GoSafar
                  </h2>

                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wide text-emerald-600">
                    Captain
                  </span>
                </div>

                <p className="mt-1 text-xs leading-4 text-slate-500">
                  Drive passengers and earn on your own schedule.
                </p>
              </div>

              {/* Arrow */}

              <div
                className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-50
                  text-slate-500
                  transition
                  group-hover:bg-slate-100
                  group-hover:text-slate-900
                "
              >
                <i className="ri-arrow-right-line text-lg" />
              </div>
            </Link>
          </section>

          {/* =====================================================
              TRUST INFORMATION
          ===================================================== */}

          <section className="mt-5 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-50">
                <i className="ri-shield-check-line text-lg text-emerald-600" />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-800">
                  Your choice isn't permanent
                </p>

                <p className="mt-0.5 text-[10px] leading-4 text-slate-500">
                  You can switch between Rider and Captain anytime.
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* =======================================================
            FOOTER
        ======================================================= */}

        <footer className="shrink-0 px-5 pb-3 -mt-2  text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <p className="text-[10px] font-medium text-slate-400">
              Safe rides. Simple journeys.
            </p>

            <span className="h-1 w-1 rounded-full bg-slate-300" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default OnboardingChoice;
