import {shallow} from 'enzyme'
import React from 'react'
import {Provider} from './ssr'

describe('Color provider', () => {
  it('should have setup as expected', () => {
    const wrapper1 = shallow<Provider>(<Provider />)
    const wrapper2 = shallow<Provider>(<Provider />, {
      disableLifecycleMethods: true,
    })
    expect(wrapper1.state()).toEqual({ssr: false})
    expect(wrapper2.state()).toEqual({ssr: true})
  })
})
