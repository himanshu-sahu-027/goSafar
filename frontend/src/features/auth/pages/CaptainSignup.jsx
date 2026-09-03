import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";

import useCaptainAuth from "../hooks/useCaptainAuth";

import "./CaptainSignup.css";

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
    <div className="captain-signup-page">
      {/* Mobile app container */}

      <div className="captain-signup-app">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="captain-signup-header">
          <Link to="/">
            <img src={logo} alt="GoSafar" className="captain-signup-logo" />
          </Link>

          <div className="captain-signup-role">
            <i className="ri-steering-2-line" />
            <span>Captain</span>
          </div>
        </header>

        {/* =====================================================
            SCROLLABLE CONTENT
        ===================================================== */}

        <main className="captain-signup-main">
          {/* ===================================================
              INTRO
          =================================================== */}

          <section className="captain-signup-intro">
            <div className="captain-signup-intro-icon">
              <i className="ri-user-add-line" />
            </div>

            <p className="captain-signup-eyebrow">Join GoSafar</p>

            <h1 className="captain-signup-title">Become a Captain</h1>

            <p className="captain-signup-description">
              Create your captain account and start driving with GoSafar.
            </p>
          </section>

          {/* ===================================================
              FORM
          =================================================== */}

          <form onSubmit={submitHandler} className="captain-signup-form">
            {/* =================================================
                PERSONAL DETAILS
            ================================================= */}

            <div className="signup-section">
              <div className="signup-section-header">
                <div className="signup-section-icon">
                  <i className="ri-user-3-line" />
                </div>

                <div>
                  <h2 className="signup-section-title">Personal details</h2>

                  <p className="signup-section-subtitle">
                    Tell us about yourself
                  </p>
                </div>
              </div>

              {/* Name */}

              <div className="signup-row">
                <div className="signup-field">
                  <label htmlFor="first-name" className="signup-label">
                    First name
                  </label>

                  <input
                    id="first-name"
                    required
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="signup-input"
                  />
                </div>

                <div className="signup-field">
                  <label htmlFor="last-name" className="signup-label">
                    Last name
                  </label>

                  <input
                    id="last-name"
                    required
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="signup-input"
                  />
                </div>
              </div>

              {/* Email */}

              <div className="signup-field signup-field-full">
                <label htmlFor="captain-email" className="signup-label">
                  Email address
                </label>

                <div className="signup-input-wrapper">
                  <i className="ri-mail-line signup-input-icon" />

                  <input
                    id="captain-email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="captain@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="signup-input with-icon"
                  />
                </div>
              </div>

              {/* Password */}

              <div className="signup-field signup-field-full">
                <label htmlFor="captain-password" className="signup-label">
                  Password
                </label>

                <div className="signup-input-wrapper">
                  <i className="ri-lock-2-line signup-input-icon" />

                  <input
                    id="captain-password"
                    required
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="signup-input with-icon"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                VEHICLE DETAILS
            ================================================= */}

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

              {/* Color + Plate */}

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

              {/* Capacity + Type */}

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
                        : "ri-user-add-line"
                    }
                  />
                </span>

                <span className="signup-submit-text">
                  {isLoading ? "Creating account..." : "Create Captain Account"}
                </span>
              </div>

              {!isLoading && (
                <span className="signup-submit-arrow">
                  <i className="ri-arrow-right-line" />
                </span>
              )}
            </button>
          </form>

          {/* ===================================================
              LOGIN
          =================================================== */}

          <div className="signup-login">
            <p className="signup-login-text">Already have a captain account?</p>

            <Link to="/captain-login" className="signup-login-link">
              Login here
            </Link>
          </div>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <div className="signup-security">
            <i className="ri-shield-check-line" />

            <p>Your information is securely protected.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CaptainSignup;
