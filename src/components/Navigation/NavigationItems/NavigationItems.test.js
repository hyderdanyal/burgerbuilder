import React from "react"
import {configure, shallow} from "enzyme"
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from "./NavigationItems"
import NavigationItem from "./NavigationItem/navigationItem"

configure({adapter:new Adapter()})

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <navigationItem/> elements if unauthenticated', () => {
        // const wrapper= shallow(<NavigationItems />)
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render three <navigationItem/> elements if authenticated', () => {
        // const wrapper= shallow(<NavigationItems isAuthenticated/>)
        // wrapper = shallow(<NavigationItems isAuthenticated />)
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should return true if <navigationItem> elements Logout w logout link is present', () => {
        wrapper.setProps({isAuthenticated: true}) //every test case is independant
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true) //failed
    })

})