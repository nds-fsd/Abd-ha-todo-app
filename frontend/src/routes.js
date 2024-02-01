import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import CardDisplayPage from './components/CardDisplayPage';
import CardDetailPage from './components/CardDetailPage';
import AddCardPage from './components/AddCardPage';
import EditCardPage from './components/EditCardPage';
import NotFoundPage from './components/NotFoundPage';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/card-display" exact component={CardDisplayPage} />
        <Route path="/card/:id" exact component={CardDetailPage} />
        <Route path="/add-card" exact component={AddCardPage} />
        <Route path="/edit-card/:id" exact component={EditCardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
