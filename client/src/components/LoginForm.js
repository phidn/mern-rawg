import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./../styles/Auth.css";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SERVER_DOMAIN, SET_CURRENT_USER, TOKEN } from '../utils/constants';

export default function LoginForm(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userInput, setUserInput] = useState({
    email: "",
    password: ""
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const handleChange = (event) => {
    let {name, value} = event.target;
    setUserInput({
      ...userInput,
      [name]: value
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await axios({
        url: `${SERVER_DOMAIN}/auth/login`,
        method: "POST",
        data: userInput
      });
      const { token, userName } = response.data.data;
      localStorage.setItem(TOKEN, token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: { userName }
      });
      history.push("/");
    } catch (error) {
      console.log("~ error", error);
      setErrorMessage(error.response.data.message);
    }
  }


  return (
    <form className="form form-login" onSubmit={handleSubmit}>
      <h1 className="display-6 mb-3 text-center">Log in</h1>
      { errorMessage && (
        <div className="error-message text-danger mb-2">Error: {errorMessage}</div>
      )}
      <input type="text" name="email" placeholder="Email" 
        value={userInput.email} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" 
        value={userInput.password} onChange={handleChange} />

      <button className="btn-submit">Log in</button>
      <div className="link-login-signup">Don't have an account?&nbsp;
        <NavLink to="/signup">Sign up.</NavLink>
      </div>
    </form>
  )
}
