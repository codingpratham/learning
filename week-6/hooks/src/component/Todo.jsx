import axios from 'axios';
import React from 'react'


const Todo = ({
    id
}) => {
    const [todo, setTodo] = React.useState({});

 React.useEffect(() => {
   axios.get('http://localhost:3000/todo?id='+id)
   .then((res)=>{
    setTodo(res.data.todo)
   })
   .catch((err)=>{
    console.error(err);
    
   })
  }, [id]);

 
  return (
    <div>
        <h1>{todo.title}</h1>
        <h3>{todo.description}</h3>
        
    </div>
  )
}

export default Todo