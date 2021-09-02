import React from 'react';
import { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { Extravio } from '../components/Extravio';
import { Login } from '../components/Login';
import { Reset } from '../components/Reset';
import { Home } from '../pages/Home';
import { LinkAccount } from '../pages/LinkAccount';
import 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { yaLogueadoAction, yaLogueadoSinValidarAction } from '../redux/userDuck';


export const Routes = () => {
    const { dni,loggedIn } = useSelector((store) => store.authGoogle);
    // console.log(loggedIn);
    const dispatch = useDispatch()

    useEffect(() => {

        if (localStorage.getItem("usuario")) {

            let {dni,uid, displayName, photo, email} = JSON.parse(localStorage.getItem("usuario"));
            // let {authGoogle} = JSON.parse(localStorage.getItem("usuario"));
            //     let {dni,uid, displayName, photo, email }=authGoogle

            if(typeof dni !== 'undefined'){
            dispatch(yaLogueadoAction(dni,uid, displayName, photo, email))
            }else{
                let {authGoogle} = JSON.parse(localStorage.getItem("usuario"));
                let {uid, displayName, photo, email }=authGoogle
                // console.log('en Routes:',uid, displayName,photo,email);

                dispatch(yaLogueadoSinValidarAction(uid, displayName, photo, email))
            }

        } else {
            // console.log('no tiene autenticacion');
            return  <Route exact path="/">
                        <Redirect to="/login" />
                    </Route>
        }


    }, [dispatch])


    return (
        <Router>
            <Switch>

                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>

                <Route exact path='/login' component={Login} />
                <Route path='/extravio' component={Extravio} />
                <Route path='/link' component={loggedIn ? LinkAccount : Login} />
                <Route path='/home' component={dni ? Home : Login} />

                <Route path='/reset' component={Reset} />
                <Route path='**' component={Login} />


                <Route path='/' component={Login} />


            </Switch>
        </Router>
    )
}