import { createContext, useState } from "react";

export const CaptainAuthContext = createContext(null);

const CaptainAuthProvider = ({ children }) => {
  const [captain, setCaptain] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  return (
    <CaptainAuthContext.Provider
      value={{
        captain,
        setCaptain,
        authChecked,
        setAuthChecked,
      }}
    >
      {children}
    </CaptainAuthContext.Provider>
  );
};

export default CaptainAuthProvider;
