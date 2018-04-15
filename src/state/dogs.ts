import { range } from 'ramda'
import { AnyAction } from 'redux'
import { FetchingDog, FoundDog } from '../constants/dogs'

export interface Dog {
  url: string,
  loading: boolean,
  type: string
}

interface DogCollection {
  [index: number]: Dog
}

export interface Dogs {
  dogs: DogCollection
}

export const InitialState: Dogs = {
  dogs: range(0, 8).reduce((acc: DogCollection, num: number): DogCollection => {
    return {
      ...acc,
      [num]: { loading: false, url: '', type: undefined }
    }
  }, {})
}

export default (
  state: Dogs,
  action: AnyAction
): Dogs => {
  switch (action.type) {
    case FoundDog:
      return {
        ...state,
        dogs: {
          ...state.dogs,
          [action.index]: {
            url: action.url,
            loading: false,
            type: action.imageType
          }
        }
      }
    case FetchingDog:
      return {
        ...state,
        dogs: {
          ...state.dogs,
          [action.index]: {
            url: '',
            loading: true,
            type: undefined
          }
        }
      }
    default:
      return state || InitialState
  }
}
