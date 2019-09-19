import React from "react";
import { shallow } from "enzyme";
import Landing from "./Landing";
import Login from "../Login/Login";
import { Register } from "../Register/Register";
import { CSSTransition } from "react-transition-group";

//Des' Tests
describe("Login should be rendered", () => {
  it("Renders the Login Component", () => {
    const land = shallow(<Landing />);
    //    const text = land.find(Login).length).toEqual(1)
    expect(land.find(Login).length).toEqual(1);
  });
});
describe("Register should be rendered", () => {
  it("Renders the Register Component", () => {
    const land = shallow(<Landing />);

    expect(land.find(Register).length).toEqual(0);
  });
});
describe("Should see login", () => {
  it("Login Title", () => {
    const land = shallow(<Landing />);
    const h1 = land
      .find("h1")
      .at(1)
      .text();
    expect(h1).toEqual("LOGIN");
  });
});
describe("Should see Register", () => {
  it("Register Title", () => {
    const land = shallow(<Landing />);
    const h1 = land
      .find("h1")
      .at(0)
      .text();
    expect(h1).toEqual("REGISTER");
  });
});
describe("Should have img", () => {
  it("IMAGE", () => {
    const land = shallow(<Landing />);
    const img = land
      .find("img")
      .at(0)
      .prop("src");
    expect(img).toEqual("/static/icons8-back-arrow-64.png");
  });
});

//Aaron's Tests
describe("Should see profile picture Input", () => {
  it("Profile picture input should have type text", () => {
    const land = shallow(<Register />);
    const input = land.find("input#profilePic");
    expect(input.props()).toHaveProperty("type", "text");
  });
});
describe("Should see First Name Input", () => {
  it("Input should have placeholder First Name", () => {
    const land = shallow(<Register />);
    const input = land.find("input#firstName");
    expect(input.props()).toHaveProperty("placeholder", "First Name");
  });
});
describe("Should see Last Name Input", () => {
  it("Input should have className list-item", () => {
    const land = shallow(<Register />);
    const input = land.find("input#lastName");
    expect(input.props()).toHaveProperty("className", "list-item");
  });
});
describe("Should see Email Input", () => {
  it("Input should have type email", () => {
    const land = shallow(<Register />);
    const input = land.find("input#email");
    expect(input.props()).toHaveProperty("type", "email");
  });
});
describe("Should see Password Input", () => {
  it("Input should have type password", () => {
    const land = shallow(<Register />);
    const input = land.find("input#password");
    expect(input.props()).toHaveProperty("type", "password");
  });
});
