import express from 'express';
import openapispec from './openapi.js';
import swaggerUi from 'swagger-ui-express';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/api-docs', express.static('docs'));
app.use('/api-docs', express.static('openapispec.yml'));
let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
];

app.get('/users', (req, res) => {
    const { name } = req.query;

    if (name) {
        const filteredUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
        res.json(filteredUsers);
    } else {
        res.json(users);
    }
});

app.use("/",swaggerUi.serve,swaggerUi.setup(openapispec))

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});