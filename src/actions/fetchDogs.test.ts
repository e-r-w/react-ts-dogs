import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { fetchDog } from './fetchDogs'
import * as nock from 'nock'
import { Video, Picture, Webbum } from '../constants/imageType'

describe('fetchDog', () => {
  it('should parse mp4 file type',async () => {
    nock('https://random.dog')
      .get('/woof.json')
      .reply(200, {
        url: 'https://foobar/dog.mp4'
      })

    const store = createStore(
      (state, action) => action,
      applyMiddleware(thunk)
    )

    await fetchDog(0)(store.dispatch)

    const state: any = store.getState()
    expect(state.imageType).toEqual(Video)
  })

  it('should parse picture file type',async () => {
    nock('https://random.dog')
      .get('/woof.json')
      .reply(200, {
        url: 'https://foobar/dog.gif'
      })

    const store = createStore(
      (state, action) => action,
      applyMiddleware(thunk)
    )

    await fetchDog(0)(store.dispatch)

    const state: any = store.getState()
    expect(state.imageType).toEqual(Picture)
  })

  it('should parse webm file type',async () => {
    nock('https://random.dog')
      .get('/woof.json')
      .reply(200, {
        url: 'https://foobar/dog.webm'
      })

    const store = createStore(
      (state, action) => action,
      applyMiddleware(thunk)
    )

    await fetchDog(0)(store.dispatch)

    const state: any = store.getState()
    expect(state.imageType).toEqual(Webbum)
  })

  it('should retry invalid file types',async () => {
    const invalid = nock('https://random.dog')
      .get('/woof.json')
      .reply(200, {
        url: 'https://foobar/dog.psd'
      })

    const valid = nock('https://random.dog')
      .get('/woof.json')
      .reply(200, {
        url: 'https://foobar/dog.jpg'
      })

    const store = createStore(
      (state, action) => action,
      applyMiddleware(thunk)
    )

    await fetchDog(0)(store.dispatch)

    invalid.done()
    valid.done()
  })
})
