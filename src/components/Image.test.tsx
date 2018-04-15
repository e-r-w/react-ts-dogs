import * as React from 'react'
import { shallow } from 'enzyme'
import Image from './Image'
import { Picture, Video, Webbum } from '../constants/imageType'

describe('Image', () => {
  it('should render a video for mp4', () => {
    const rendered = shallow(
      <Image
        url='foobar.mp4'
        type={Video}
        />
    )

    expect(
      rendered.find('video').exists()
    ).toBeTruthy()

    const source = rendered.find('source')

    expect(
      source.prop('type')
    ).toEqual('video/mp4')
  })

  it('should render a video for webm', () => {
    const rendered = shallow(
      <Image
        url='foobar.webm'
        type={Webbum}
        />
    )

    expect(
      rendered.find('video').exists()
    ).toBeTruthy()

    const source = rendered.find('source')

    expect(
      source.prop('type')
    ).toEqual('video/webm')
  })

  it('should render an image for jpg', () => {
    const rendered = shallow(
      <Image
        url='foobar.jpg'
        type={Picture}
        />
    )

    const img = rendered.find('img')

    expect(
      img.exists()
    ).toBeTruthy()

    expect(
      img.prop('src')
    ).toEqual('foobar.jpg')
  })
})
