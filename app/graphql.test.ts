import {createContext, createRootValue, createSchema} from './graphql'

test('Schema creator should be valid', () => {
  expect(createContext).not.toThrow()
  expect(createRootValue).not.toThrow()
  expect(createSchema).not.toThrow()
})
