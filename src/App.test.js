import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { HashRouter } from "react-router-dom";
import { shallow } from "enzyme";

it("renders without crashing", () => {
  shallow(
    <HashRouter>
      <App />{" "}
    </HashRouter>
  );
});

// describe('Register should be rendered', () => {
//   it('Renders the Register Component', () => {
//    const land = shallow(<Landing/>)

//    expect(land.find(Register).length).toEqual(1)
//   })
// });
