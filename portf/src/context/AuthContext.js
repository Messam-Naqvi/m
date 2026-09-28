import React, { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuth, isOwner } from "../firebase/auth";

const AuthContext = createContext({ user: null, isOwner: false, loading: true });

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, isOwner: isOwner(user), loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
