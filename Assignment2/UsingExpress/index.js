
const express = require('express')
const app = express()
const PostRouters  = require('./Modules/Posts/Posts.routers')
const UsersRoutes = require('./Modules/Users/users.Routers')


app.use(express.json()) // change buffer
app.use(UsersRoutes)
app.use(PostRouters)




app.listen(5000, () => {
console.log("Server is running on port number 5000 ................/");
});
