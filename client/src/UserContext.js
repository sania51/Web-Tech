import { createContext, useState } from "react";

export const UserContext = createContext();

export default function UserStore(props) {
  const [xxx, setX] = useState([]);
  return (
    <UserContext.Provider value={[xxx, setX]}>
      {props.children}
    </UserContext.Provider>
  );
}
