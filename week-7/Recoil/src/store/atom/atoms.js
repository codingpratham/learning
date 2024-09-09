// import { atomFamily } from "recoil";
// import { TODOS } from "../../TODOS";

// export const todo=atomFamily({
//     key:"todo",
//     default:id=>{
//         return TODOS.find(x=>x.id==id)
//     }
// })

import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todo = atomFamily({
  key: 'todo',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: (id) => async ({get}) => {
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
      return res.data.todo;
    },
  })
});