import exp from "constants";
import { set } from "mongoose";
import React, { createContext, useContext, useState, useEffect } from "react";

const SupervisorAuthContext = React.createContext();

export function useSupervisorAuth() {
  return useContext(SupervisorAuthContext);
}

export function SupervisorAuthProvider(prop) {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };

  return (
    <SupervisorAuthContext.Provider value={{ value }}>
      {prop.children}
    </SupervisorAuthContext.Provider>
  );
}
