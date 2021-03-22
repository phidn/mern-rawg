import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from './pages/Home'
import LoginForm from './components/LoginForm';
import AppContext from "./components/AppContext";
import PageNotFound from './components/PageNotFound';
import { TOKEN, SET_CURRENT_USER, SERVER_DOMAIN } from './utils/constants';
import axios from 'axios';
import { AuthTemplate } from './templates/AuthTemplate';
import SignupForm from './components/SignupForm';

export default function App() {
  const state = useSelector(state => state.AppReducer);
  const dispatch = useDispatch();
  // not render func if refresh App (use cb in memory)
  const checkCurrentUser = useCallback(
    async () => {
      try {
        const token = localStorage.getItem(TOKEN);
        const res = await axios({
          url: `${SERVER_DOMAIN}/auth`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if(res.data.data.user) {
          const { userName } = res.data.data.user;
          dispatch({type: SET_CURRENT_USER, payload: { userName }});
        }
      } catch (error) {
        console.log("~ error", error);
      }
    },[dispatch]
  );

    useEffect(() => {
      checkCurrentUser();
    }, [checkCurrentUser]);

  return (
    <Router>
      <AppContext.Provider value={{ state }}>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/games/:genres" component={Home}/>
            <AuthTemplate exact path="/login" AuthComponent={LoginForm}/>
            <AuthTemplate exact path="/signup" AuthComponent={SignupForm}/>
            <Route exact path="*" component={PageNotFound}/>
        </Switch>
      </AppContext.Provider>
    </Router>
  )
}
