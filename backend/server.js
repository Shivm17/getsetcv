import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import path from 'path';
import { fileURLToPath } from 'url';
import resumeRouter from './routes/resumeRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const port = process.env.PORT || 3000;


app.use(cors());

//connect to the database
connectDB();


//middleware to parse JSON
app.use(express.json()    );

app.use('/api/auth', userRouter);
app.use('/api/resume', resumeRouter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads'),{
  setHeaders: (res, _path) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Allow CORS for my frontend origin 
  }
}));

//routes
app.get('/', (req, res) => {
  res.send('This is the your backend!');
});

//server listen
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});