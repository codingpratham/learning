import React from 'react'

export const Todo = ({
    title,
    description
}) => {
  return (
    <>
    <h1>{title}</h1>
    <h3>{description}</h3>
    </>
  )
}
