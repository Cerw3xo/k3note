"use client";

import react, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type UserContextType = {
  user: string;
  setUser: (user: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState("Matej");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext missing");
  return context;
};
