import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

dotenv.config()

const app = express()
const port = process.env.PORT || 6000

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions))

if (process.env.ENV === 'dev') {

    app.get("/", (req, res) => {
        res.send("API IS RUNNING...")
    })
}

app.listen(port, () => console.log(`Server running on port ${port}`));