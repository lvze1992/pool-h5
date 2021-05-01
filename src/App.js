//https://reactrouter.com/web/example/sidebar
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Tab, Pool, Energy, Wallet, Setting } from './pages';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/pool" />
        <Route path="/setting" component={Setting} />
        <Switch>
          <Tab>
            <Route path="/pool" component={Pool} />
            <Route path="/energy" component={Energy} />
            <Route path="/wallet" component={Wallet} />
          </Tab>
        </Switch>
      </Switch>
    </Router>
  );
}

export default App;
