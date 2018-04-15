import * as React from 'react'
import { shallow } from 'enzyme'
import { Page } from '../pages'
import { Segment } from 'semantic-ui-react'

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

    const segment = rendered.find(Segment)

    expect(segment.exists()).toBeTruthy()
    expect(segment.prop('loading')).toBeTruthy()
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

    const segment = rendered.find(Segment)

    expect(segment.exists()).toBeTruthy()
    expect(segment.prop('loading')).toBeFalsy()
  })
})
