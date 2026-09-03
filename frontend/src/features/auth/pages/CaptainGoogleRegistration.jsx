import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";

import useCaptainAuth from "../hooks/useCaptainAuth";

import "./CaptainGoogleRegistration.css";

function CaptainGoogleRegistration() {
  const location = useLocation();

  const { completeGoogleRegistration, isLoading, error } = useCaptainAuth();

  const registrationToken = location.state?.registrationToken;

  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  if (!registrationToken) {
    return <Navigate to="/captain-login" replace />;
  }

  /*
   * Vehicle becomes completed only when
   * all required vehicle fields contain values.
   */
  const vehicleCompleted =
    vehicleColor.trim() !== "" &&
    vehiclePlate.trim() !== "" &&
    vehicleCapacity !== "" &&
    vehicleType !== "";

  const submitHandler = async (e) => {
    e.preventDefault();

    const vehicleData = {
      color: vehicleColor.trim(),
      plate: vehiclePlate.trim(),
      capacity: vehicleCapacity,
      vehicleType,
    };

    await completeGoogleRegistration(registrationToken, vehicleData);
  };

  return (
    <div className="captain-google-page">
      <div className="captain-google-app">
        {/* =====================================================
            STICKY HEADER
        ===================================================== */}

        <header className="captain-google-header">
          <Link to="/" className="captain-google-logo-link">
            <img src={logo} alt="GoSafar" className="captain-google-logo" />
          </Link>

          <div className="captain-google-role">
            <i className="ri-steering-2-line" />
            <span>Captain</span>
          </div>

          <Link
            to="/captain-login"
            className="captain-google-close"
            aria-label="Back to captain login"
          >
            <i className="ri-close-line" />
          </Link>
        </header>

        {/* =====================================================
            REGISTRATION TIMELINE
        ===================================================== */}

        <div className="captain-google-timeline">
          {/* ---------------------------------------------------
              GOOGLE - ALWAYS COMPLETED
          --------------------------------------------------- */}

          <div className="timeline-step completed">
            <div className="timeline-icon">
              <i className="ri-google-fill" />

              <span className="timeline-check">
                <i className="ri-check-line" />
              </span>
            </div>

            <p>Google</p>
          </div>

          {/* Google → Vehicle Always cyan because Google verification is complete. */}
          <div className="timeline-line completed" />

          {/* ---------------------------------------------------
              VEHICLE - CURRENT / COMPLETED
          --------------------------------------------------- */}

          <div
            className={`timeline-step ${
              vehicleCompleted ? "completed" : "current"
            }`}
          >
            <div className="timeline-icon">
              {vehicleCompleted ? (
                <i className="ri-car-line" />
              ) : (
                <i className="ri-car-line" />
              )}
            </div>

            <p>Vehicle</p>
          </div>

          {/* Vehicle → Ready
              Only becomes cyan after all fields are completed. */}
          <div
            className={`timeline-line ${vehicleCompleted ? "completed" : ""}`}
          />

          {/* ---------------------------------------------------
              READY
          --------------------------------------------------- */}

          <div
            className={`timeline-step ${
              vehicleCompleted ? "ready" : "upcoming"
            }`}
          >
            <div className="timeline-icon">
              <i className="ri-check-line" />
            </div>

            <p>Ready</p>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <main className="captain-google-main">
          {/* ===================================================
              INTRO
          =================================================== */}

          <section className="captain-google-intro">
            <p className="captain-google-eyebrow">Almost there</p>

            <h1 className="captain-google-title">
              Complete your captain profile
            </h1>

            <p className="captain-google-description">
              Your Google account is verified. Add your vehicle details to start
              driving with GoSafar.
            </p>
          </section>

          {/* ===================================================
              VEHICLE FORM
          =================================================== */}

          <form onSubmit={submitHandler} className="captain-google-form">
            <div className="signup-section">
              <div className="signup-section-header">
                <div className="signup-section-icon dark">
                  <i className="ri-car-line" />
                </div>

                <div>
                  <h2 className="signup-section-title">Vehicle details</h2>

                  <p className="signup-section-subtitle">
                    Add your vehicle information
                  </p>
                </div>
              </div>

              {/* =================================================
                  COLOR + PLATE
              ================================================= */}

              <div className="signup-row">
                <div className="signup-field">
                  <label htmlFor="vehicle-color" className="signup-label">
                    Vehicle color
                  </label>

                  <input
                    id="vehicle-color"
                    required
                    type="text"
                    placeholder="e.g. White"
                    value={vehicleColor}
                    onChange={(e) => setVehicleColor(e.target.value)}
                    className="signup-input"
                  />
                </div>

                <div className="signup-field">
                  <label htmlFor="vehicle-plate" className="signup-label">
                    Number plate
                  </label>

                  <input
                    id="vehicle-plate"
                    required
                    type="text"
                    placeholder="e.g. OD02AB1234"
                    value={vehiclePlate}
                    onChange={(e) => setVehiclePlate(e.target.value)}
                    className="signup-input plate"
                  />
                </div>
              </div>

              {/* =================================================
                  CAPACITY + TYPE
              ================================================= */}

              <div className="signup-row signup-field-full">
                <div className="signup-field">
                  <label htmlFor="vehicle-capacity" className="signup-label">
                    Capacity
                  </label>

                  <div className="signup-input-wrapper">
                    <i className="ri-group-line signup-input-icon" />

                    <input
                      id="vehicle-capacity"
                      required
                      min="1"
                      type="number"
                      placeholder="Passengers"
                      value={vehicleCapacity}
                      onChange={(e) => setVehicleCapacity(e.target.value)}
                      className="signup-input with-icon"
                    />
                  </div>
                </div>

                <div className="signup-field">
                  <label htmlFor="vehicle-type" className="signup-label">
                    Vehicle type
                  </label>

                  <div className="signup-input-wrapper">
                    <i className="ri-car-line signup-input-icon" />

                    <select
                      id="vehicle-type"
                      required
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                      className="signup-select with-icon"
                    >
                      <option value="" disabled>
                        Select type
                      </option>

                      <option value="car">Car</option>

                      <option value="auto">Auto</option>

                      <option value="moto">Moto</option>
                    </select>

                    <i className="ri-arrow-down-s-line signup-select-arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="signup-error">
                <div className="signup-error-icon">
                  <i className="ri-error-warning-line" />
                </div>

                <p>{error}</p>
              </div>
            )}

            {/* =================================================
                SUBMIT
            ================================================= */}

            <button
              type="submit"
              disabled={isLoading}
              className="signup-submit"
            >
              <div className="signup-submit-content">
                <span className="signup-submit-icon">
                  <i
                    className={
                      isLoading
                        ? "ri-loader-4-line animate-spin"
                        : "ri-checkbox-circle-line"
                    }
                  />
                </span>

                <span className="signup-submit-text -ml-2">
                  {isLoading
                    ? "Creating account..."
                    : "Complete Captain Account"}
                </span>
              </div>
            </button>
          </form>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <div className="captain-google-security">
            <i className="ri-shield-check-line" />

            <p>Your information is securely protected.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CaptainGoogleRegistration;
