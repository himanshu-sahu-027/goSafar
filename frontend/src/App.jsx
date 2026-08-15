import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./features/landing/pages/Start";
import OnboardingChoice from "./features/landing/pages/OnboardingChoice";
/*import Home from "";
import UserLogin from "";
import UserSignup from "";
import Captainlogin from "";
import CaptainSignup from "";*/

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/choice" element={<OnboardingChoice/>} />
      </Routes>
    </div>
  );
}

export default App;
