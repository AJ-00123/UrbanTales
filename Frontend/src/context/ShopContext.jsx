import React, { createContext, useState } from "react";

export const ShopContext = createContext();

export default function ShopProvider({ children }) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <ShopContext.Provider value={{ showSearch, setShowSearch }}>
      {children}
    </ShopContext.Provider>
  );
}
