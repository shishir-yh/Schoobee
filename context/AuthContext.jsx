import React, { createContext, useContext, useState } from "react";
// import { users } from "../data/users";
import { users } from "../data/users";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (schoolCode, userId, password) => {
    const user = users.find(
      (item) =>
        item.schoolCode === schoolCode &&
        item.userId === userId &&
        item.password === password
    );

    if (!user) {
      return {
        success: false,
        message: "Invalid school code, user ID, or password.",
      };
    }

    setCurrentUser(user);

    return {
      success: true,
      user,
    };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}