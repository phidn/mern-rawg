import React from 'react'

export default function VideoGame(props) {
  return (
    <video
      src={props?.src}
      loop
      muted
      // controls
    ></video>
  )
}
