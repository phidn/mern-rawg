import React from 'react'
import { NavLink } from 'react-router-dom'
// import $ from "jquery";

export default function Header() {
  return (
    <header className="header">
      <div className="header__item">
        <NavLink to="/" className="header__item-logo">RAWG</NavLink>
      </div>
      <div className="header__item header__form-search">
        <div className="form-search__input_area">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search 520.198 games"/>
        </div>
      </div>
      <div className="header__item">
        <NavLink to="/login" className="header__item-link">Login</NavLink>
        <NavLink to="/signup" className="header__item-link">Sign up</NavLink>
        <NavLink to="/#" className="header__item-link">API</NavLink>
        <a href="/#" className="header__item-link">...</a>
      </div>
    </header>
  )
}
