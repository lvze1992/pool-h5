import React, { useContext, createContext, useState, useEffect } from 'react';
import Actions from 'src/actions';
const StoreContext = createContext();
function useProvideStore() {
  const currentUser = Actions.AV.User.current();
  const [user, setUser] = useState(currentUser ? currentUser.toJSON() : null);
  const [chiaConfig, setChiaConfig] = useState({});
  const [tokens, setTokens] = useState([]);
  const [price, setPrice] = useState({});
  // const [hasTradePwd, setHasTradePwd] = useState('');
  console.log('user', user, Actions.AV);
  useEffect(() => {
    (async function () {
      const chiaConfig = await Actions.getChiaConfig();
      const tokens = await Actions.getTokens();
      const price = await Actions.getPrice({});
      // const hasTradePwd = await Actions.hasTradePwd();
      setChiaConfig(chiaConfig);
      setTokens(tokens);
      setPrice(price);
      // setHasTradePwd(hasTradePwd);
    })();
  }, []);
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
    chia: {
      chiaConfig,
    },
    price,
    tokens,
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
