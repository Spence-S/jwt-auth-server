//import dependencies
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
import connectMongoose  from './config/db';
import router from './routes/routes';
import passport from 'passport';

//set port
const port = process.env.PORT || 8080;

//create app
const app = express();

//connect to database
connectMongoose()
  .then( result => {
    console.log(result);
  }).catch( error => {
    console.log(error);
  })

//set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//app middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.use(urlencoded({ extended : true }));
app.use('/', router);

// Catch 404s and pass to error handler
app.use((req, res, next) => {
  let err = new Error('NOPE! 404: Resources Not Found');
  err.status = 404;
  next(err);
});

//Define error handler
app.use((err, req, res, next) => {
  res.status( err.status || 500);
  console.log(err.stack);
    res.send({
      status: err.status,
      message: err.message,
      stack: err.stack
    });
});

//start up the app!
app.listen(port, ()=>{
  console.log(`Auth app is now listening on port ${port}`);
});
