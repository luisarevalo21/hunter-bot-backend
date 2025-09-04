const express = require('express');
const cors = require('cors');
require('dotenv').config()

const chatRouter = require('./controller/chat');
const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors(
{
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }
));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/openai', chatRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 