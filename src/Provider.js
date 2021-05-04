import React, { useContext, createContext, useState } from 'react';
import Actions from 'src/actions';
const StoreContext = createContext();
function useProvideStore() {
  const currentUser = Actions.AV.User.current();
  const [user, setUser] = useState(currentUser ? currentUser.toJSON() : null);
  console.log('user', user);

  const signin = (user, cb) => {
    setUser(user);
    cb && cb();
  };

  const signout = (cb) => {
    Actions.AV.User.logOut();
    setUser(null);
    cb && cb();
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
