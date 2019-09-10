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
    hightlightRegister: false,
    displayLogin: true,
    highlightLogin: true
  };

  toggleRegister = () => {
    this.setState(prevstate => ({
      displayRegister: !prevstate.displayRegister
    }));
  };

  toggleLogin = () => {
    this.setState(prevstate => ({
      displayLogin: !prevstate.displayLogin
    }));
  };

  toggleRegisterHighlight = () => {
    this.setState(state => ({
      hightlightRegister: !state.hightlightRegister
    }));
  };

  toggleLoginHighlight = () => {
    this.setState(state => ({
      hightlightLogin: !state.hightlightLogin
    }));
  };

  render() {
    return (
      <div className="landingContainer">
        <div
          className={cx("toggler", {
            "toggler--active": this.state.displayRegister
          })}
          onClick={this.toggleRegister}
        >
          <h1
            className={cx("register-title", {
              "register-title--active": this.state.displayRegister
            })}
          >
            REGISTER
          </h1>
        </div>
        <CSSTransition
          in={this.state.displayRegister}
          timeout={350}
          classNames="display"
          unmountOnExit
        >
          <Register />
        </CSSTransition>

        <div
          className={cx("toggler2", {
            "toggler2--active": this.state.displayLogin
          })}
          onClick={this.toggleLogin}
        >
          <h1
            className={cx("login-title", {
              "login-title--active": this.state.displayLogin
            })}
          >
            LOGIN
          </h1>
        </div>
        <CSSTransition
          in={this.state.displayLogin}
          timeout={350}
          classNames="display2"
          unmountOnExit
        >
          <Login />
        </CSSTransition>
      </div>
    );
  }
}

export default Landing;
