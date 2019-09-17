import React from 'react';
import { shallow } from 'enzyme';
import Landing from './Landing';
import Login from '../Login/Login'
import Register from '../Register/Register'
import { CSSTransition } from "react-transition-group";
describe('Login should be rendered', () => {

  it('Renders the Login Component', () => {
   const land = shallow(<Landing/>) 
//    const text = land.find(Login).length).toEqual(1) 
   expect(land.find(Login).length).toEqual(1)
  })
});
describe('Register should be rendered', () => {
  it('Renders the Register Component', () => {
   const land = shallow(<Landing/>) 

   expect(land.find(Register).length).toEqual(1)
  })
});
describe('Should see login', () => {
  it('Login Title', () => {
   const land = shallow(<Landing />) 
  const h1 = land.find('h1').at(1).text()
  expect(h1).toEqual('LOGIN')
  })
});
describe('Should see Register', () => {
  it('Register Title', () => {
   const land = shallow(<Landing />) 
  const h1 = land.find('h1').at(0).text()
  expect(h1).toEqual('REGISTER')
  })
});
describe('Should have img', () => {
  it('IMAGE', () => {
   const land = shallow(<Landing />) 
  const img = land.find('img').at(0).prop('src')
  expect(img).toEqual('/static/icons8-back-arrow-64.png')
  })
});