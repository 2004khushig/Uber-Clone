// userContext.jsx

import { createContext, useState } from "react";

// Create and export the context
export const UserDataContext = createContext();

// Export the provider as a named export
export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: "",
    fullName: {
      firstName: "",
      lastName: "",
    },
  });

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  );
};
