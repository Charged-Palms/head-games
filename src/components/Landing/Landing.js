import React, { Component } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import { CSSTransition } from "react-transition-group";
import ReactDOM from "react-dom";
import cx from "classnames";
import "./Landing.css";

export class Landing extends Component {
  state = {
    displayRegister: false,
    hightlightRegister: false
  };

  toggle = () => {
    this.setState(prevstate => ({
      displayRegister: !prevstate.displayRegister
    }));
  };

  toggleHighlight = () => {
    this.setState(state => ({
      hightlightRegister: !state.hightlightRegister
    }));
  };
  render() {
    return (
      <div className="landingContainer">
        <button
          className={cx("toggler", {
            "toggler--active": this.state.displayRegister
          })}
          onClick={this.toggle}
        >
          Register
        </button>
        <CSSTransition
          in={this.state.displayRegister}
          timeout={350}
          classNames="display"
          unmountOnExit
        >
            <Register/>
          {/* <div className="menu">
            <ul className="list">
              <li className="list-item">Rajat</li>
              <li className="list-item">Writes about React</li>
              <li className="list-item">Loves Pizza</li>
            </ul>
          </div> */}
        </CSSTransition>
      </div>
    );
  }
}

export default Landing;
