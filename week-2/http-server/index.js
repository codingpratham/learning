const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>{
  res.send("hello")
})

app.post('/new', (req, res) => {
  console.log(req.body)
  console.log(req.headers["authorization"])
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
