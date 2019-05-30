
import React from "react"

import { NavLink } from "react-router-dom";

import "../stylesheets/header.css"

export class Header extends React.Component {
  render() {
    return (
      <div className="header-cont">
        <div className="header desktop">
          <NavLink className="logo-cont desktop" exact to="/">
            Wirepost
          </NavLink>
          <NavLink className="logo-cont mobile" exact to="/">
            Wirepost
          </NavLink>
          <div className="nav" id="nav">
            <NavLink className="nav-links" exact to="/">Home</NavLink>
            {
              //<NavLink className="nav-links" to="/videos">Videos</NavLink>
            }
            <NavLink className="nav-links" to="/sports">Sports</NavLink>
            <NavLink className="nav-links" to="/entertainment">Entertaiment</NavLink>
            <NavLink className="nav-links" to="/politics">Politics</NavLink>
            <NavLink className="nav-links" to="/technology">Technology</NavLink>
            <NavLink className="nav-links" to="/culture">Culture</NavLink>
            <NavLink className="nav-links" to="/world">World</NavLink>
          </div>
          <div className="nav-btn" onClick={function(){document.getElementById('nav').classList.toggle('open')}}></div>
        </div>
      </div>
    )
  }
}