//export the class component at the top for jest testing (only if it has the connect), export default at bottom
import React from 'react'
//puts the component here so you can test it
import { shallow } from 'enzyme'
import { Profile } from './Profile'

// describe('display button', () => {

//     it('display setting button', () => {
//         const rend = shallow(<Profile />)
//         const btn = rend.find('button').at(4).text()
//         expect(btn).toEqual("Settings")
//     })
// })