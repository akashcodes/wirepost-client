
import React from "react"

import { NavLink } from "react-router-dom";

import "../stylesheets/footer-home.css"

export class FooterHome extends React.Component {
  render() {
    return (
      <div className="footer-cont">
        <div className="footer desktop">
          <div className="nav" id="nav">
            <NavLink className="nav-links" exact to="/">Wirepost</NavLink>
            <NavLink className="nav-links" to="/sports">Sports</NavLink>
            <NavLink className="nav-links" to="/entertainment">Entertaiment</NavLink>
            <NavLink className="nav-links" to="/politics">Politics</NavLink>
            <NavLink className="nav-links" to="/technology">Technology</NavLink>
            <NavLink className="nav-links" to="/culture">Culture</NavLink>
            <NavLink className="nav-links" to="/world">World</NavLink>
          </div>
        </div>
      </div>
    )
  }
}