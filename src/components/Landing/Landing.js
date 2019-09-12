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
    highlightLogin: true,
  };

  toggleRegister = () => {
    this.setState(prevstate => ({
      displayRegister: !prevstate.displayRegister,
      displayLogin: !prevstate.displayLogin
    }));
  };

  toggleLogin = () => {
    this.setState(prevstate => ({
      displayLogin: !prevstate.displayLogin,
      displayRegister: !prevstate.displayRegister
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
          <img
            src="/static/icons8-back-arrow-64.png"
            alt="backArrow"
            className={cx("register-arrow", {
              "register-arrow--active": this.state.displayRegister
            })}
          />
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
          timeout={1000}
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
          <img
            src="/static/icons8-back-arrow-64.png"
            alt="backArrow"
            className={cx("login-arrow", {
              "login-arrow--active": this.state.displayLogin
            })}
          />
        </div>
        <CSSTransition
          in={this.state.displayLogin}
          timeout={1000}
          classNames="display2"
          unmountOnExit
          appear={true}
        >
          <Login />
        </CSSTransition>
      </div>
    );
  }
}

export default Landing;
