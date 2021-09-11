import React, { useState } from "react";
import ChatApp from "./chatapp/ChatApp";

export const rootContext = React.createContext<{ name: string }>(undefined!);

function AppRoot() {
  const [name, setName] = useState<string>("");
  React.useEffect(() => {
    if (name === "") {
      const input = prompt("Your name?", "");
      if (input) {
        setName(input)
      }
    }
  }, [name]);

  return (
    <rootContext.Provider value={{ name }}>
      <ChatApp />
    </rootContext.Provider>
  );
}

export default AppRoot;
