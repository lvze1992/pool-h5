//https://reactrouter.com/web/example/sidebar
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { Tab, Pool, Energy, Wallet, Setting, Auth, Withdraw, History } from './pages';
import { ProvideStore, useStore } from './Provider';
import './App.scss';

function PrivateRoute({ authType, component, ...rest }) {
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
                  pathname: '/auth',
                  state: { from: location, authType },
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
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/pool/:id" component={Pool} />
          <PrivateRoute path="/energy" component={Energy} />
          <PrivateRoute path="/withdraw" component={Withdraw} />
          <PrivateRoute path="/history/:pageType" component={History} />
          <Switch>
            <Tab>
              <Route path="/pool" component={Pool} />
              <PrivateRoute path="/wallet" component={Wallet} />
              <PrivateRoute path="/setting" component={Setting} />
            </Tab>
          </Switch>
        </Switch>
      </Router>
    </ProvideStore>
  );
}

export default App;
