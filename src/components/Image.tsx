import * as React from 'react'
import { Picture, Video, Webbum } from '../constants/imageType'
import { Image } from 'semantic-ui-react'

interface Props {
  type: string,
  url: string
}

export default ({
  type,
  url
}: Props) => {
  if (type === Picture) {
    return (
      <Image
        src={url}
        verticalAlign='middle'
        centered
        fluid
        />
    )
  }
  if ([Video, Webbum].indexOf(type) > -1) {
    return (
      <video
        width='100%'
        height='auto'
        controls
        >
        <source
          src={url}
          type={type === Video ? 'video/mp4' : 'video/webm'}
        />
      </video>
    )
  }
  return null
}
