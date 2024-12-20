import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js'
import testRouter from './routes/test/testRoutes.js'
import { errorHandler, notFound } from './middlewares/errorMiddleware.js'
import questionRouter from './routes/v1/questionsRoutes.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 6000

connectDB()

const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.ENV === 'dev') {

    app.get("/", (req, res) => {
        res.send("API IS RUNNING...")
    })

    app.use('/api/test', testRouter)
}

app.use('/api/v1/questions', questionRouter)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  
    next();
  });

  //CAST ERROR RESPONSE HERE
  app.use(notFound)
  app.use(errorHandler)

app.listen(port, () => console.log(`Server running on port ${port}`));