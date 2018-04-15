import dogsReducer, { InitialState } from './dogs'
import { fetchingDog, foundDog } from '../actions/fetchDogs'

describe('dogsReducer', () => {
  it('should return 8 dogs for initial state', () => {
    const initialState = dogsReducer(undefined, { type: 'any' })
    expect(
      Object.keys(initialState.dogs).length
    ).toEqual(8)
  })

  it('should set loading state to true', () => {
    const action = fetchingDog(0)
    const next = dogsReducer(InitialState, action)
    expect(
      next.dogs[0].loading
    ).toBeTruthy()
  })

  it('should set loading state to true', () => {
    const action = foundDog(0, 'http://some.url/', 'foobar')
    const next = dogsReducer(InitialState, action)
    const dog = next.dogs[0]
    expect(dog.loading).toBeFalsy()
    expect(dog.url).toEqual('http://some.url/')
    expect(dog.type).toEqual('foobar')
  })
})
