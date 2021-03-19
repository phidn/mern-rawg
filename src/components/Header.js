import React from 'react';
import { NavLink } from 'react-router-dom';
import "./../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__item">
        <NavLink to="/" className="header__item-logo">RAWG</NavLink>
      </div>
      <div className="header__item header__form-search">
        <div className="form-search__input">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search 520.198 games"/>
        </div>
      </div>
      <div className="header__item">
        <NavLink to="/login" className="header__item-link">Login</NavLink>
        <NavLink to="/signup" className="header__item-link">Sign up</NavLink>
      </div>
    </header>
  )
}
