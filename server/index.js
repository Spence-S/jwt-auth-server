import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

const port = 8080;
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello there you fucking cock sucker!');
});

/*********************
catch 404 errors
**********************/
app.use((req, res, next) => {
  let err = new Error('NOPE! 404 bitch: Resources Not Found');
  err.status = 404;
  next(err);
});

//set up error handler
app.use((err, req, res, next) => {
  res.status( err.status || 500);
    res.send({
      status: err.status,
      message: err.message,
    });
});

//start running app
app.listen(port, ()=>{
  console.log(`App is now listening on port ${port}`);
});
