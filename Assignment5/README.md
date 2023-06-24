*using  Sequlize   and express * 
create two tables
user table (name , email , password ,age)
notes table (title,content , userID)

-user APIs-
1- sign up
2- sign in 
3- update user 
4- delete user
5- search for user where his name start with "a" and age less than 30 => using like for characters
6- search for user where his age is between 20 and 30 
7 - get the 3 oldest users(اكبر ٣ مستخدمين فى العمر)
8- search for users by list of ids => using IN
9- get all user 


-Notes APIs-
1- add note
2- delete note (note creator only )
3- update note (note owner only)
4- get all notes
5- get all notes with their owners informaion (using include)

**Search points: **
-how to change the UserId column name 
- many to many relationShip using sequelize 
