Assignment 6:
using mongoose  and express
create two collections
*user collection * ( userName, email , password ,age,gender , phone)
post collection (title,content , userID => must be related to the user collection )

user APIs
1-sign up ( email must be unique ) 
2-sign in 
3-update user
4-delete user
5-search for user where his name start with "X" and age less than Y=>   (X,Y => variables)
6-search for user where his age is between X and Y
7-get all user 
8- get user profile with user posts(using populate)

Post APIs
1- add post (make sure that user already exist)
2- delete post (post creator only )
3- update post (post owner only)
4- get all posts
5- get all posts with their owners informaion (using populate)
6- sort posts descending (By date)

Search points:
- how to relate two collections
- findOneAndDelete VS findOneAndRemove
