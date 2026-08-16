import { Route, Routes } from "react-router-dom";

import Start from "./features/landing/pages/Start";
import OnboardingChoice from "./features/landing/pages/OnboardingChoice";

import UserLogin from "./features/auth/pages/UserLogin";
import UserSignup from "./features/auth/pages/UserSignup";
import UserHome from "./features/user/pages/UserHome";

import UserProtectWrapper from "./features/auth/components/UserProtectWrapper";
import UserAuthInitializer from "./features/auth/components/UserAuthInitializer";

import CaptainHome from "./features/captain/pages/CaptainHome";
function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Start />} />
      <Route path="/choice" element={<OnboardingChoice />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route path="/user-signup" element={<UserSignup />} />

      {/* Protected */}
      <Route
        path="/user-home"
        element={
          <UserAuthInitializer>
            <UserProtectWrapper>
              <UserHome />
            </UserProtectWrapper>
          </UserAuthInitializer>
        }
      />

      <Route path="/captain-home" element={<CaptainHome />} />
    </Routes>

    
  );
}

export default App;
