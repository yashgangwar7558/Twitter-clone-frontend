const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToMongoDB = require('./db/conn')
const router = require('./routers/services');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: 'https://dancing-puppy-71cd54.netlify.app', credentials: true }));
app.use(cookieParser());

// to ensure server connects to database before its live
connectToMongoDB()
    .then(() => {

        app.use(router)

        app.get('/', async (req, res) => {
            res.status(200).send("Server is live!")
        })

        app.listen(port, () => {
            console.log(`Server is live at port no. ${port}`);
        })
    })

