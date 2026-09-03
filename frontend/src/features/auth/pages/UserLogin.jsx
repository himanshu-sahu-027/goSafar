import { useState } from "react";
import { Link } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";

import useUserAuth from "../hooks/useUserAuth";

import "./UserLogin.css";

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
    <div className="user-login-page">
      {/* Mobile app container */}

      <div className="user-login-app">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="user-login-header">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="GoSafar" className="user-login-logo" />
          </Link>

          <div className="user-login-role">
            <i className="ri-user-3-line" />
            <span>Rider</span>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <main className="user-login-main">
          {/* ===================================================
              INTRO
          =================================================== */}

          <section className="user-login-intro">
            <div className="user-login-intro-icon">
              <i className="ri-user-3-line" />
            </div>

            <p className="user-login-eyebrow">Welcome back, Rider</p>

            <h1 className="user-login-title">Log in to GoSafar</h1>

            <p className="user-login-description">
              Log in to book rides, track your captain and enjoy a smooth
              journey with GoSafar.
            </p>
          </section>

          {/* ===================================================
              LOGIN FORM
          =================================================== */}

          <form onSubmit={submitHandler} className="user-login-form">
            {/* Email */}

            <div className="user-login-field">
              <div className="user-login-label-row">
                <label htmlFor="user-email" className="user-login-label">
                  Email address
                </label>
              </div>

              <div className="user-login-input-wrapper">
                <span className="user-login-input-icon">
                  <i className="ri-mail-line" />
                </span>

                <input
                  id="user-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="user-login-input"
                />
              </div>
            </div>

            {/* Password */}

            <div className="user-login-field">
              <div className="user-login-label-row">
                <label htmlFor="user-password" className="user-login-label">
                  Password
                </label>

                <span className="user-login-hint">Keep it secure</span>
              </div>

              <div className="user-login-input-wrapper">
                <span className="user-login-input-icon">
                  <i className="ri-lock-2-line" />
                </span>

                <input
                  id="user-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="user-login-input"
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="user-login-error">
                <div className="user-login-error-icon">
                  <i className="ri-error-warning-line" />
                </div>

                <p className="user-login-error-message">{error}</p>
              </div>
            )}

            {/* Login button */}

            <button
              type="submit"
              disabled={isLoading}
              className="user-login-submit"
            >
              <div className="user-login-submit-content">
                <span className="user-login-submit-icon">
                  <i
                    className={
                      isLoading
                        ? "ri-loader-4-line animate-spin"
                        : "ri-login-box-line"
                    }
                  />
                </span>

                <span className="user-login-submit-text pl-30">
                  {isLoading ? "Logging in..." : "Login"}
                </span>
              </div>

              {!isLoading && (
                <span className="user-login-submit-arrow">
                  <i className="ri-arrow-right-line" />
                </span>
              )}
            </button>
          </form>

          {/* ===================================================
              SIGN UP
          =================================================== */}

          <section className="user-login-signup">
            <div className="user-login-signup-divider">
              <div className="user-login-signup-line" />

              <span className="user-login-signup-label">New to GoSafar?</span>

              <div className="user-login-signup-line" />
            </div>

            <Link to="/user-signup" className="user-login-signup-link">
              <i className="ri-user-add-line" />

              <span>Create a new account</span>
            </Link>
          </section>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <div className="user-login-security">
            <i className="ri-shield-check-line" />

            <p>Your account information is securely protected.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserLogin;
