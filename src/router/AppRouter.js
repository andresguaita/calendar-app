import React from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
  } from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (  
              <Router>
                <div>
                  <Switch>
                    <Route exact path="/login">
                      <LoginScreen/>
                    </Route>
                    <Route exact path="/register">
                      <RegisterScreen />
                    </Route>
                    <Route exact path="/">
                      <CalendarScreen />
                    </Route>
                    <Redirect to='/'/>
                  </Switch>
                </div>
              </Router>
            )        
}
