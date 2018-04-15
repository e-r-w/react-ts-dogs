import * as React from 'react'
import { shallow } from 'enzyme'
import { Page } from './index'
import Image from '../components/Image'

const noop = () => {} // tslint:disable-line

describe('Page', () => {
  it('should show a loading placeholder while image is loading', () => {
    const rendered = shallow(
      <Page
        dogs={[{
          url: '',
          type: '',
          loading: true,
          index: 0
        }]}
        fetchDogs={noop}
        />
    )

    const placeholder = rendered.find('.test-loading-placeholder')

    expect(placeholder.exists()).toBeTruthy()
  })

  it('should show an image once loaded', () => {
    const rendered = shallow(
      <Page
        dogs={[{
          url: '',
          type: '',
          loading: false,
          index: 0
        }]}
        fetchDogs={noop}
      />
    )

    const placeholder = rendered.find('.test-loading-placeholder')

    expect(placeholder.exists()).toBeFalsy()

    const imageComponent = rendered.find(Image)

    expect(imageComponent.exists()).toBeTruthy()
  })
})
