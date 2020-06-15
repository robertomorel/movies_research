import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import MovieReview from '../pages/MovieReview';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/movieReview/:movieID+" exact component={MovieReview} />
    {/*
    <Route path="/" exact component={MovieReview} />
    <Route path="/teste" exact component={Dashboard} />
    */}
  </Switch>
);

export default Routes;
