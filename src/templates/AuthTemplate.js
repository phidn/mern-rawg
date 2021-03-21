import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/Header";

export const AuthTemplate = (props) => {

  let { AuthComponent, ...restRoute } = props;
  return <Route { ...restRoute } render={(propsRoute) => {
    return (
      <div className="page page-auth">
        <Header/>
        <div className="auth__art">
          <div style={{height:"100vh"}} className="art-wrapper"></div>
        </div>
        <div className="auth__form">
          <AuthComponent { ...propsRoute }/>
        </div>
      </div>
    )
  }}/>
}
