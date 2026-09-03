import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import logo from "../../../assets/goSafar.logo.png";
import GoogleSigninButton from "../components/GoogleSigninButton";

import useCaptainAuth from "../hooks/useCaptainAuth";

import "./CaptainLogin.css";

function CaptainLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { login, signinWithGoogle, isLoading, error } = useCaptainAuth();

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

  const handleGoogleSignin = async (idToken) => {
    const result = await signinWithGoogle(idToken);

    if (result?.registrationRequired) {
      navigate("/captain-google-registration", {
        state: {
          registrationToken: result.registrationToken,
        },
      });
    }
  };

  return (
    <div className="captain-login-page">
      {/* Mobile app container */}

      <div className="captain-login-app">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="captain-login-header">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="GoSafar" className="captain-login-logo" />
          </Link>

          <div className="captain-login-role">
            <i className="ri-steering-2-line" />
            <span>Captain</span>
          </div>
        </header>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <main className="captain-login-main">
          {/* ===================================================
              INTRO
          =================================================== */}

          <section className="captain-login-intro">
            <div className="captain-login-intro-icon">
              <i className="ri-steering-2-line" />
            </div>

            <p className="captain-login-eyebrow ">Welcome back, Captain</p>

            <h1 className="captain-login-title">Log in to GoSafar</h1>

            <p className="captain-login-description">
              Log in to manage your rides, accept passengers and start earning.
            </p>
          </section>

          {/* ===================================================
              LOGIN FORM
          =================================================== */}

          <form onSubmit={submitHandler} className="captain-login-form">
            {/* Email */}

            <div className="captain-login-field">
              <div className="captain-login-label-row">
                <label htmlFor="captain-email" className="captain-login-label">
                  Email address
                </label>
              </div>

              <div className="captain-login-input-wrapper">
                <span className="captain-login-input-icon">
                  <i className="ri-mail-line" />
                </span>

                <input
                  id="captain-email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoComplete="email"
                  placeholder="captain@example.com"
                  className="captain-login-input"
                />
              </div>
            </div>

            {/* Password */}

            <div className="captain-login-field">
              <div className="captain-login-label-row">
                <label
                  htmlFor="captain-password"
                  className="captain-login-label"
                >
                  Password
                </label>

                <span className="captain-login-hint">Keep it secure</span>
              </div>

              <div className="captain-login-input-wrapper">
                <span className="captain-login-input-icon">
                  <i className="ri-lock-2-line" />
                </span>

                <input
                  id="captain-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="captain-login-input"
                />
              </div>
            </div>

            {/* Error */}

            {error && (
              <div className="captain-login-error">
                <div className="captain-login-error-icon">
                  <i className="ri-error-warning-line" />
                </div>

                <p className="captain-login-error-message">{error}</p>
              </div>
            )}

            {/* Login button */}

            <button
              type="submit"
              disabled={isLoading}
              className="captain-login-submit"
            >
              <div className="captain-login-submit-content">
                <span className="captain-login-submit-icon">
                  <i
                    className={
                      isLoading
                        ? "ri-loader-4-line animate-spin"
                        : "ri-login-box-line"
                    }
                  />
                </span>

                <span className="captain-login-submit-text pl-30">
                  {isLoading ? "Logging in..." : "Login"}
                </span>
              </div>

              {!isLoading && (
                <span className="captain-login-submit-arrow">
                  <i className="ri-arrow-right-line" />
                </span>
              )}
            </button>
          </form>

          {/* ===================================================
              OR
          =================================================== */}
          <div className="my-3 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* ===================================================
              GOOGLE SIGNIN
          =================================================== */}
          <div>
            <GoogleSigninButton
              onSuccess={handleGoogleSignin}
              disabled={isLoading}
            />
          </div>

          {/* ===================================================
              REGISTER
          =================================================== */}

          <section className="captain-login-register">
            <div className="captain-login-register-divider">
              <div className="captain-login-register-line" />

              <span className="captain-login-register-label">New Captain?</span>

              <div className="captain-login-register-line" />
            </div>

            <Link to="/captain-signup" className="captain-login-register-link">
              <i className="ri-user-add-line" />

              <span>Register as a Captain</span>
            </Link>
          </section>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <div className="captain-login-security">
            <i className="ri-shield-check-line" />

            <p>Your account information is securely protected.</p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CaptainLogin;
