//export the class component at the top for jest testing (only if it has the connect), export default at bottom
import React from 'react'
//puts the component here so you can test it
import { shallow } from 'enzyme'
import UserSettings from './UserSettings'
const rend = shallow(<UserSettings />)
describe('button info', () => {
    it('display profile button', () => {
        const rend = shallow(<UserSettings />)
        const btn = rend.find('button').at(0).text()
        expect(btn).toEqual("Profile")
    })
});
describe('button home', () => {
    it('display home button', () => {
        const rend = shallow(<UserSettings />)
        const btn = rend.find('button').at(1).text()
        expect(btn).toEqual("Home")
    })
});
describe('h1 displaying correct value', () => {
    it('display correct value', () => {
        const h1 = rend.find('h1').at(0).text()
        expect(h1).toEqual("UserSettings")
    })
});
describe('h3 to display correct data', () => {
    it('should display your name', () => {
        const h3 = rend.find("h3").at(0).text()
        expect(h3).toEqual("Your Name")
    })
})
describe("h5 correct values", () => {
    it('should display your bio', () => {
        const bio = rend.find("h5").at(0).text()
        expect(bio).toEqual("Your Bio")
    })
})