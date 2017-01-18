# jwt-auth-server
My implementation of jwt auth server to use on future projects.

More to come...


##Auth server data flow


Route POST Signup
1. client sends POST request to signup route (POST /users)
2. The clients data is saved to the database
  * The email is saved
  * The password is salted, hashed by bcrypt, THEN saved
3. A JWT token is generated, then returned to the client for future authorized requests

I am currently unsure if I want to save the JWT token in the database and associate it with the user ???

Route POST Signin
