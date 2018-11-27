import {find} from 'globule'
import {resolve} from 'path'

interface Context {
  INITIAL_CONTEXT: {}
}

describe('Contexts', () => {
  const path = '../*/context/*{!.test}.ts{,x}'
  const files: string[] = find(resolve(__dirname, path))
  const contextTable = files.map(file => require(file) as Context)

  it('should have unique names for properties', () => {
    const names = contextTable
      .map(({INITIAL_CONTEXT}) => Object.keys(INITIAL_CONTEXT))
      .reduce((array, keys) => [...array, ...keys], [])
    expect(names).toEqual([...new Set(names)])
  })
})
