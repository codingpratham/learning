import React from 'react'
import { useRecoilValue } from 'recoil'
import { todo } from '../store/atom/atoms'

const Todo = ({id}) => {
    const [todo, setTodo] = useRecoilState(todosAtomFamily(id));

    return (
      <>
        {todo.title}
        {todo.description}
        <br />
      </>
    )
  }

export default Todo