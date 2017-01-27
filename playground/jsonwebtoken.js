//This file is a playground to help myself understand
//how the jsonwebtoken library works

//require the package
const jwt = require('jsonwebtoken');

//payload containing an id that is my full name
let payload = { id: 'Spencer A Snyder' };

//log the payload
console.log('payload:' , payload)

//set a secret = secret
let secret = 'secret'

//Make the token synchronously
let token = jwt.sign(payload, secret)

//log the token
console.log( 'token:', token );

//
let decoded= jwt.verify(token, secret);

console.log('decoded token:', decoded);
