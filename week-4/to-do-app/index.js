const express = require('express');
const app = express();
app.use(express.json());

app.post('/todo', function(req, res) {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(411).json({
            msg: "Not eligible"
        });
    } else {
        return res.status(200).json({
            title,
            description
        });
    }
});

app.listen(3000, function() {
    console.log("Server is running at http://localhost:3000/");
});
