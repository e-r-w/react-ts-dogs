import { Dispatch, Action, AnyAction } from 'redux'
import { range } from 'ramda'
import { FetchingDog, FoundDog } from '../constants/dogs'
import { Picture, Video, Webbum, Unknown } from '../constants/imageType'

export interface FoundDogAction extends Action {
  url: string,
  index: number,
  imageType: string
}

export interface FetchingDogAction extends Action {
  index: number
}

export const foundDog = (index: number, url: string, imageType: string): FoundDogAction => {
  return {
    type: FoundDog,
    url,
    index,
    imageType
  }
}

export const fetchingDog = (index: number): FetchingDogAction => {
  return {
    type: FetchingDog,
    index
  }
}

const parseType = (url: string): string => {
  if (/\.mp4$/.test(url.toLowerCase())) {
    return Video
  }
  if (/\.webm$/.test(url.toLowerCase())) {
    return Webbum
  }
  if (/\.(gif|jpg|jpeg|png|bmp)$/.test(url.toLowerCase())) {
    return Picture
  }
  return Unknown
}

export const fetchDog = (index: number) => (dispatch: Dispatch<AnyAction>): Promise<any> => {
  dispatch(fetchingDog(index))

  return fetch('https://random.dog/woof.json')
    .then(response => response.json())
    .then(({ url }) => {
      const type = parseType(url)

      if (type === Unknown) {
        return dispatch(fetchDog(index))
      } else {
        dispatch(foundDog(index, url, type))
      }
    })
}

export default () => (dispatch: Dispatch<AnyAction>) => {
  return Promise.all(
    range(0, 8).map((index: number) => {
      return dispatch(fetchDog(index))
    })
  )
}
