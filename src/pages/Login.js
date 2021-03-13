import React from 'react'
import LoginForm from '../components/forms/LoginForm'
import Header from '../components/Header'

export default function Login(props) {
  return (
    <div className="page page-auth">
      <Header/>
      <div className="auth__art">
        <div style={{height:"100vh"}} className="art-wrapper"></div>
      </div>
      <div className="auth__form">
        <LoginForm/>
      </div>
    </div>
  )
}
