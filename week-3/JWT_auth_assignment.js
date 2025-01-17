const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"; // Using consistent secret for JWT

const app = express();

app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  return ALL_USERS.some(user => user.username === username && user.password === password);
}

app.post("/signin", function (req, res) {
  const { username, password } = req.body;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in-memory db",
    });
  }

  const token = jwt.sign({ username }, jwtPassword);
  return res.json({ token });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ msg: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    const filteredUsers = ALL_USERS.filter(user => user.username !== username);
    res.json({ users: filteredUsers });
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
