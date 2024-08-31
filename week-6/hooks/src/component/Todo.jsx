import axios from 'axios';
import React from 'react'
const Todo = ({
    id
}) => {
    const [todos, setTodos] = React.useState([]);

 React.useEffect(() => {
   axios.get('http://localhost:3000/todo?id='+id)
   .then((res)=>{
    setTodos(res.data.todos)
   })
  }, []);

  return (
    <div>
        <h1>{title}</h1>
        <h3>{description}</h3>
    </div>
  )
}

export default Todo