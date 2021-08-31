import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Extravio } from '../components/Extravio';
import { Login } from '../components/Login';
import { Reset } from '../components/Reset';
import { Home } from '../pages/Home';
import { LinkAccount } from '../pages/LinkAccount';


export const Routes = () => {
    return (
        <Router>
            <Switch>

                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>

                <Route exact path='/login' component={Login} />
                <Route path='/extravio' component={Extravio} />
                <Route path='/link' component={LinkAccount} />
                <Route path='/reset' component={Reset} />
                


                <Route path='/' component={Home} />

                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>

                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>

            </Switch>
        </Router>
    )
}