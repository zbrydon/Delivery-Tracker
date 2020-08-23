import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [loginState, setLoginState] = useState(false);

  const Authenticated = () => {
    setLoginState(true);
  };
  return (
    <>
      <AuthContext.Provider value={{ loginState, Authenticated }}>
        {props.children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContextProvider;
