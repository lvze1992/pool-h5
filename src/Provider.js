import React, { useContext, createContext, useState } from 'react';

const StoreContext = createContext();

function useProvideStore() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return () => {
      setUser('user');
      cb();
    };
  };

  const signout = (cb) => {
    return () => {
      setUser(null);
      cb();
    };
  };

  return {
    user,
    signin,
    signout,
  };
}
function ProvideStore({ children }) {
  const auth = useProvideStore();
  return <StoreContext.Provider value={auth}>{children}</StoreContext.Provider>;
}
function useStore() {
  return useContext(StoreContext);
}
export { ProvideStore, useStore };
