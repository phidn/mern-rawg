import React from 'react'

export default function VideoGame(props) {
  console.log("video game render");
  return (
    <video
      src={props?.src}
      loop
      muted
      // controls
    ></video>
  )
}
