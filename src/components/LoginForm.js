import React from 'react'
import { NavLink } from 'react-router-dom'
import "./../styles/Auth.css";

export default function LoginForm(props) {
  return (
    <div className="form form-login">
      <h1 className="display-6 mb-3">Log in</h1>
      <input type="text" name="email" placeholder="Email"/>
      <input type="text" name="password" placeholder="Password"/>
      <button className="btn-submit">Log in</button>
      <div className="link-signup">Don't have an account?&nbsp;
        <NavLink to="/signup">Sign up.</NavLink>
      </div>
    </div>
  )
}
