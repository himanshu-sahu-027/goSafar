import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";

import useUserAuth from "../hooks/useUserAuth";

import "./UserSignup.css";

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
    <div className="user-signup-page">
      {/* Mobile app container */}

      <div className="user-signup-app">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="user-signup-header">
          <Link to="/">
            <img src={logo} alt="GoSafar" className="user-signup-logo" />
          </Link>

          <div className="user-signup-role">
            <i className="ri-user-3-line" />
            <span>Rider</span>
          </div>
        </header>

        {/* =====================================================
            SCROLLABLE CONTENT
        ===================================================== */}

        <main className="user-signup-main">
          {/* ===================================================
              INTRO
          =================================================== */}

          <section className="user-signup-intro">
            <div className="user-signup-intro-icon">
              <i className="ri-user-add-line" />
            </div>

            <p className="user-signup-eyebrow">Join GoSafar</p>

            <h1 className="user-signup-title">Create your Rider account</h1>

            <p className="user-signup-description">
              Create your account and start booking comfortable rides with
              GoSafar.
            </p>
          </section>

          {/* ===================================================
              FORM
          =================================================== */}

          <form onSubmit={submitHandler} className="user-signup-form">
            {/* =================================================
                PERSONAL DETAILS
            ================================================= */}

            <div className="user-signup-section">
              <div className="user-signup-section-header">
                <div className="user-signup-section-icon">
                  <i className="ri-user-3-line" />
                </div>

                <div>
                  <h2 className="user-signup-section-title">
                    Personal details
                  </h2>

                  <p className="user-signup-section-subtitle">
                    Tell us about yourself
                  </p>
                </div>
              </div>

              {/* Name */}

              <div className="user-signup-row">
                <div className="user-signup-field">
                  <label htmlFor="first-name" className="user-signup-label">
                    First name
                  </label>

                  <input
                    id="first-name"
                    required
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="user-signup-input"
                  />
                </div>

                <div className="user-signup-field">
                  <label htmlFor="last-name" className="user-signup-label">
                    Last name
                  </label>

                  <input
                    id="last-name"
                    required
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="user-signup-input"
                  />
                </div>
              </div>

              {/* Email */}

              <div className="user-signup-field user-signup-field-full">
                <label htmlFor="user-email" className="user-signup-label">
                  Email address
                </label>

                <div className="user-signup-input-wrapper">
                  <i className="ri-mail-line user-signup-input-icon" />

                  <input
                    id="user-email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="user-signup-input with-icon"
                  />
                </div>
              </div>

              {/* Password */}

              <div className="user-signup-field user-signup-field-full">
                <label htmlFor="user-password" className="user-signup-label">
                  Password
                </label>

                <div className="user-signup-input-wrapper">
                  <i className="ri-lock-2-line user-signup-input-icon" />

                  <input
                    id="user-password"
                    required
                    type="password"
                    autoComplete="new-password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="user-signup-input with-icon"
                  />
                </div>
              </div>
            </div>

            {/* =================================================
                ERROR
            ================================================= */}

            {error && (
              <div className="user-signup-error">
                <div className="user-signup-error-icon">
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
              className="user-signup-submit"
            >
              <div className="user-signup-submit-content">
                <span className="user-signup-submit-icon">
                  <i
                    className={
                      isLoading
                        ? "ri-loader-4-line animate-spin"
                        : "ri-user-add-line"
                    }
                  />
                </span>

                <span className="user-signup-submit-text">
                  {isLoading ? "Creating account..." : "Create account"}
                </span>
              </div>

              {!isLoading && (
                <span className="user-signup-submit-arrow">
                  <i className="ri-arrow-right-line" />
                </span>
              )}
            </button>
          </form>

          {/* ===================================================
              LOGIN
          =================================================== */}

          <div className="user-signup-login">
            <p className="user-signup-login-text">
              Already have a GoSafar account?
            </p>

            <Link to="/user-login" className="user-signup-login-link">
              Login here
            </Link>
          </div>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <div className="user-signup-security">
            <i className="ri-shield-check-line" />

            <p>Your information is securely protected.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserSignup;
