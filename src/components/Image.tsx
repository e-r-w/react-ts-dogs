import * as React from 'react'
import { Picture, Video, Webbum } from '../constants/imageType'

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
      <img
        src={url}
        width='320'
        height='240'
        />
    )
  }
  if ([Video, Webbum].indexOf(type) > -1) {
    return (
      <video
        width='320'
        height='240'
        controls
        >
        <source
          src={url}
          type={type === Video ? 'video/mp4' : 'video/webm'}
        />
      </video>
    )
  }
}
