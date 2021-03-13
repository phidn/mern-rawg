import React from 'react'
// import $ from "jquery";

export default function Header() {
  return (
    <header className="header">
      <div className="header__item">
        <a href="/#" className="header__item-logo">RAWG</a>
      </div>
      <div className="header__item header__form-search">
        <div className="form-search__input_area">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search 520.198 games"/>
        </div>
      </div>
      <div className="header__item">
        <a href="/#" className="header__item-link">Login</a>
        <a href="/#" className="header__item-link">Sign up</a>
        <a href="/#" className="header__item-link">API</a>
        <a href="/#" className="header__item-link">...</a>
      </div>
    </header>
  )
}
