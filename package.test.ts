import {bundledDependencies, dependencies} from './package.json'

describe('package.json', () => {
  it('should have matching dependencies', () => {
    expect(Object.keys(dependencies).sort())
      .toEqual([...bundledDependencies].sort())
  })
})
