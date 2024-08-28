import React from 'react'

const Card = ({
    children
}) => {
  return (
    <div style={{
        border:"1px solid black",
        padding:10,
        margin:10
    }}
    >{children}</div>
  )
}

export default Card