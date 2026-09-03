import { Link } from "react-router-dom";

import trafficLight from "../assets/trafficLight.png";

function Start() {
  return (
    <div className="flex h-dvh w-full justify-center overflow-hidden bg-slate-900">
      {/* =========================================================
          MOBILE APP CONTAINER
      ========================================================= */}

      <div className="flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-slate-50">
        {/* =======================================================
            ILLUSTRATION
        ======================================================= */}

        <section className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-slate-900">
          {/* Decorative glow */}

          <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />

          {/* Subtle grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.04]
              bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)]
              bg-[size:32px_32px]
            "
          />

          {/* Illustration */}

          <div className="relative flex h-[480px] w-full items-center justify-center px-4 py-6">
            <div className="relative h-full max-h-[520px] overflow-hidden rounded-[26px]">
              <img
                src={trafficLight}
                alt="GoSafar journey illustration"
                className="h-full w-full object-contain"
              />
            </div>
          </div>

          {/* Top brand badge */}

          <div
            className="
              absolute
              left-5
              top-5
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-white/10
              px-3
              py-1.5
              backdrop-blur-md
            "
          >
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-white">
              GoSafar
            </span>
          </div>

          {/* Bottom illustration label */}

          <div
            className="
              absolute
              bottom-5
              left-1/2
              flex
              -translate-x-1/2
              items-center
              gap-2
              rounded-full
              border
              border-white/10
              bg-slate-950/70
              px-3
              py-1.5
              backdrop-blur-md
            "
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-500/15">
              <i className="ri-road-map-line text-xs text-cyan-400" />
            </span>

            <span className="whitespace-nowrap text-[9px] font-medium text-white/90">
              Your journey starts here
            </span>
          </div>
        </section>

        {/* =======================================================
            BOTTOM CONTENT
        ======================================================= */}

        <section
          className="
            relative
            shrink-0
            bg-white
            px-5
            pb-6
            pt-5
            shadow-[0_-10px_35px_rgba(15,23,42,0.18)]
          "
        >
          {/* Drag indicator */}

          <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200" />

          {/* Small heading */}

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-cyan-500" />

            <p className="text-[9px] font-bold uppercase tracking-[0.17em] text-cyan-600">
              Welcome to GoSafar
            </p>
          </div>

          {/* Main heading */}

          <h1 className="mt-1.5 text-[24px] font-bold leading-7 tracking-tight text-slate-900">
            Safar with GoSafar
          </h1>

          {/* Description */}

          <p className="mt-1.5 max-w-[330px] text-[12px] leading-5 text-slate-500">
            Choose your way to ride or drive and start your journey with
            GoSafar.
          </p>

          {/* =====================================================
              CONTINUE BUTTON
          ===================================================== */}

          <Link
            to="/choice"
            className="
              group
              mt-4
              flex
              h-[52px]
              w-full
              items-center
              justify-between
              rounded-2xl
              bg-slate-900
              px-4
              text-white
              shadow-[0_8px_20px_rgba(15,23,42,0.18)]
              transition
              duration-200
              hover:bg-slate-800
              active:scale-[0.98]
            "
          >
            <div className="flex items-center gap-2.5">
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-500
                  text-white
                "
              >
                <i className="ri-arrow-right-line text-base" />
              </span>

              <span className="text-lg font-semibold pl-24">Continue</span>
            </div>

            <span
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                bg-white/10
                transition
                duration-200
                group-hover:translate-x-1
              "
            >
              <i className="ri-arrow-right-line text-base" />
            </span>
          </Link>

          {/* Footer */}

          <div className="mt-3 flex items-center justify-center gap-2 -mb-3">
            <span className="h-1 w-1 rounded-full bg-slate-300" />

            <p className="text-[10px] font-medium text-slate-400">
              Safe rides. Simple journeys.
            </p>

            <span className="h-1 w-1 rounded-full bg-slate-300" />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Start;
