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

export const fetchDog = (index: number) => async (dispatch: Dispatch<AnyAction>) => {
  dispatch(fetchingDog(index))

  const response = await fetch('https://random.dog/woof.json')
  const { url } = await response.json()

  const type = parseType(url)

  if (type === Unknown) {
    await dispatch(fetchDog(index))
  } else {
    dispatch(foundDog(index, url, type))
  }
}

export default () => async (dispatch: Dispatch<AnyAction>) => {
  await Promise.all(
    range(0, 8).map(async (index: number) => {
      await dispatch(fetchDog(index))
    })
  )
}
