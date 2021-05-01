//https://reactrouter.com/web/example/sidebar
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Tab, Pool, Energy, Wallet, Setting, Login } from './pages';
import { ProvideStore, useStore } from './Provider';

function PrivateRoute({ component, ...rest }) {
  let store = useStore();
  const location = useLocation();
  return (
    <Route
      {...rest}
      component={
        store.user
          ? component
          : () => (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )
      }
    />
  );
}

function App() {
  return (
    <ProvideStore>
      <Router>
        <Switch>
          <Redirect exact from="/" to="/pool" />
          <Route path="/setting" component={Setting} />
          <Route path="/login" component={Login} />
          <Switch>
            <Tab>
              <Route path="/pool" component={Pool} />
              <PrivateRoute path="/energy" component={Energy} />
              <PrivateRoute path="/wallet" component={Wallet} />
            </Tab>
          </Switch>
        </Switch>
      </Router>
    </ProvideStore>
  );
}

export default App;
