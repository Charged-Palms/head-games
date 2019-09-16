import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import GearTest from "./components/SettingsButton/GearTest";
import axios from "axios";
import { getSum } from "./components/Message/Message";
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<GearTest />, div);
  ReactDOM.unmountComponentAtNode(div);
});
describe('Examining the syntax of Jest tests', () => {
   
  it('sums numbers', () => {
    expect(getSum(1,3)).toEqual(4)
   });
});



