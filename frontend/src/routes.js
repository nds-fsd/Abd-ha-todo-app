import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AuthForm from './components/AuthForm/AuthForm';
import App from '.app';


const Routes = () => (
  <Router>
    <Switch>
    <Route exact path="/" component={AuthForm} />
    <Route path="/tasks" component={App} />
    </Switch>
  </Router>
);

export default Routes;