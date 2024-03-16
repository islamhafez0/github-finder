import { createContext, useState, ReactNode } from "react";
import { TUsernameContext } from "../interface";

export const UsernameContext = createContext<TUsernameContext | undefined>(
  undefined
);

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string>("");
  const setUsernameValue = (newUsername: string) => {
    setUsername(newUsername);
  };
  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsernameValue,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};
