import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes/routes';

const port = 8080;
const app = express();

mongoose.connect('mongodb://localhost:27017/authDB')

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', router);

// Catch 404s
app.use((req, res, next) => {
  let err = new Error('NOPE! 404: Resources Not Found');
  err.status = 404;
  next(err);
});

//Error handler
app.use((err, req, res, next) => {
  res.status( err.status || 500);
    res.send({
      status: err.status,
      message: err.message,
    });
});

//start up the app!
app.listen(port, ()=>{
  console.log(`App is now listening on port ${port}`);
});
