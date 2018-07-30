import React from 'react';
import LogIn from './LogIn';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LogIn}/>
            <Route path="/user/:userID" component={App}/>
            {/* Add in Error Login Screen later for error check */}
        </Switch>
    </BrowserRouter>
);

export default Router;