import { createContext, useState } from "react";

export const UserAuthContext = createContext(null);

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        setUser,
        authChecked,
        setAuthChecked,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
