const Users = [
  {
    id: 1,
    name: "nour",
    Email: "nour_ayman@gmail.com",
  },
  {
    id: 2,
    name: "Ayman",
    Email: "AymanAbdullah@gmail.com",
  },
];

const Post = [
  {
    id: 1,
    Title: "love",
    Describtion: "post about love",
  },
  {
    id: 2,
    Title: "hate",
    Describtion: "post about hate",
  },
];

// by using http
const Server = require("http");

Server.createServer((req, res) => {
  const { url, method } = req; // destruct

  if (url == "/" && method == "GET") 
  {
    res.write("tryout");
    res.end();
  }

  //posts endpoints
  else if (url == '/GetAllPosts' && method == 'GET') // to get all posts
  {
    res.write(JSON.stringify(Post));
    res.end();

  } else if (url == '/AddPost' && method == 'POST') // to add new post
  {
    let data;
    req.on('data',(chunk)=>{
      data=chunk
    })
    req.on('end',()=>{
      const parse = JSON.parse(data)
      const newpost = Post.find((newp)=>{
        return newp.id == parse.id;
      })
      if(newpost)
      {
        res.write("Post already exist")
        res.end()
      }
      else 
      {
        Post.push(parse)
        res.write(JSON.stringify(Post))
        res.end()
      }
    })
  }
  else if(url =='/deletePost' && method == 'DELETE') // to delete Post
  {
    let data
    req.on('data',(chunk)=>{
      data = chunk
    })
    req.on('end',()=>{
      const parse = JSON.parse(data)
      const TobeDeleted = Post.findIndex((posts)=>{
        return posts.id ==parse.id
      })
      if(TobeDeleted != -1)
      {
        Post.splice(TobeDeleted,1)
        res.write(JSON.stringify(Post))
        res.end()
      }
      else{
        res.write("Post not found")
        res.end()
      }
    })

  }
  else if(url =='/updatePosts' && method == 'PUT')   // to update post based on Title or desciptution or both
  {
    let data
    req.on('data', (chunk)=>{
      data=chunk
    })
    req.on('end',()=>{
      const parsing=JSON.parse(data)
      const toUpdatePost=Post.find((post)=>{
        return post.id == parsing.id && (post.Title != parsing.Title || post.Describtion != parsing.Describtion)
      })
      if(toUpdatePost)
      {
        toUpdatePost.Title=parsing.Title || toUpdatePost.Title
        toUpdatePost.Describtion = parsing.Describtion|| toUpdatePost.Describtion
        res.write("updated")
        res.write(JSON.stringify(Post))
        res.end()
      }
      else
      {
        res.write("no change ")
        res.end()

      }
    })
  }
  else if(url =='/SearchbyID' && method == 'GET')    // to search for post by id
  {
    let data;
    req.on('data', (chunk) => {
      data = chunk;
    });
    req.on('end', () => {
      const parseddata = JSON.parse(data);

      const Findpost = Post.find((user) => {
        return user.id == parseddata.id;
      });

      if (Findpost) {
        res.write("Post exists\n");

        res.write(JSON.stringify(Findpost));
        res.end();
      } else {
        res.write("post is not found");
        res.end();
      }
    });

  }
  else if(url =='/GetALLReversed' && method == 'GET') // to get all post reversed 
  {
    const array2 =[...Post]
    array2.reverse()
    res.write("THIS IS REVERSED ARRAY\n")
    res.write(JSON.stringify(array2))
    res.write("THIS IS THE ORIGINAL ARRAY\n")
    res.write(JSON.stringify(Post))
    res.end()

  }

  //users endpoints
  else if (url == '/AddUser' && method == 'POST') // ADD NEW USER
  {
    let data;
    req.on("data", (chunk) => {
    data = chunk;
    });
    req.on("end", () => {
      const parseddata = JSON.parse(data);

      const CheckUser = Users.find((user) => {
        return user.Email == parseddata.Email || user.id == parseddata.id;
      });

      if (CheckUser) {
        res.write("User Already exists");
        res.end();
      } else {
        Users.push(parseddata);
        res.write(JSON.stringify(Users));
        res.end();
      }
    });
  } else if (url == '/GetAllUsers' && method == 'GET') //GET all users
  {
    res.write(JSON.stringify(Users));
    res.end();
  } else if (url == '/GetAllUserSorted' && method == 'GET') //get all users sorted by name
  {
    
    const sortedUsers = Users.slice().sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    res.write(JSON.stringify(sortedUsers));
    res.end();
  } else if (url == '/GetAllUserSortedID' && method == 'GET') //Get all users sorted by id 
  {
    const sortedUsers = Users.slice().sort((a, b) => a.id - b.id);
    res.write(JSON.stringify(sortedUsers));
    res.end();
  } else if (url == '/Update' && method == 'PATCH')  //to update name if changed
  { 
    let data;
    req.on('data', (chunk) => {
      data = chunk;
    });
    req.on('end', () => {
      const parseddata = JSON.parse(data);
      const toupdate = Users.find((user) => {
        return user.Email == parseddata.Email && user.id == parseddata.id && user.name != parseddata.name
      });
      if (toupdate) {
        toupdate.name = parseddata.name || toupdate.name;
        res.write("User updated successfully");
        res.write(JSON.stringify(Users));
        res.end();
      } else {
        res.write("no change in the user");
        res.end();
      }
    });
  } else if (url == '/Delete' && method == 'DELETE') // Delete user
  {
    let data;
    req.on('data', (chunk) => {
      data = chunk;
    });
    req.on('end', () => {
      const parseddata = JSON.parse(data);
      const deleteuser = Users.findIndex((user) => {
        return user.id == parseddata.id || user.Email == parseddata.Email });
      
      if (deleteuser != -1) {
        Users.splice(deleteuser, 1);
        res.write(JSON.stringify(Users));
        res.end();
      } else {
        res.write("user not found");
        res.end();
      }
    });
  } else if (url == '/SearchbyId' && method == 'GET') //search by id
  {
    let data;
    req.on('data', (chunk) => {
      data = chunk;
    });
    req.on('end', () => {
      const parseddata = JSON.parse(data);

      const CheckUser = Users.find((user) => {
        return user.id == parseddata.id;
      });

      if (CheckUser) {
        res.write("User exists\n");

        res.write(JSON.stringify(CheckUser));
        res.end();
      } else {
        res.write("user is not found");
        res.end();
      }
    });
  } else {
    res.write("404 invalid API");
    res.end();
  }
}).listen(3000, () => {
  console.log("Server is Running on port 3000........................../");
});
