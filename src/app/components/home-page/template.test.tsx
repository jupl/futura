import {shallow} from 'enzyme'
import React from 'react'
import {AppHomePage} from './template'

test('<AppHomePage> template', () => {
  expect(shallow(<AppHomePage ssr />)).toMatchSnapshot()
  expect(shallow(<AppHomePage ssr={false} />)).toMatchSnapshot()
})
