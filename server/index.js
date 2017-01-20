import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { json } from 'body-parser';
import cors from 'cors';
import connectMongoose  from './config/db';
import router from './routes/routes';



const port = 8080;
const app = express();

connectMongoose()
  .then( result => {
    console.log(result);
  }).catch( error => {
    console.log(error);
  })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(morgan('dev'));
app.use(json());
app.get('/*', (req, res, next) => {
  res.setHeader('Last-Modified', (new Date()).toUTCString());
  next();
});
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
  console.log(err.stack);
    res.send({
      status: err.status,
      message: err.message,
    });
});

//start up the app!
app.listen(port, ()=>{
  console.log(`Auth app is now listening on port ${port}`);
});
