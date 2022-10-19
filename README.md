readme in progress / project in progress

# Groupomania
Fictif mission for OpenClassRooms studies. This app is an internal social network for Groupomania company.

## Global features
* Login : with secure data
* Sign in : with secure data
* Homepage : display post of all users
* Post : with text, video and pictures / creation, modify and delete
* Like post system : with anti cheat
* Commentary / creation, modify and delete

## Requirement
* Node.js : https://nodejs.org
* Clone this project in your work directory
  `git clone https://github.com/fifi634/Groupomania.git`

## Running database (Atlas by MongoDB)
You must create .env files in api/config/ directory with inside :

`# Server config :`

`PORT = '5000'`

`# Mongo DB config :`

`MONGO_ID = 'fifi634'`

`MONGO_PASSWORD = 'HQKuUSmQKuJvHTFg'`

`MONGO_CLUSTER = 'cluster0.m5rfro8.mongodb.net'`

## Running backend
* Since the project directory, in cli go to backend directory :
  `cd api`
* Install all instances
  `npm install`
* Launch backend server
  `node server`

## Running frontend
* Since the project directory, in cli go to frontend directory :
  `cd client`
* Install all instances
  `npm install`
* Launch frontend server
  `npn run start`


# Database

## Users
* _id : integer - required and unique, generate automaticaly
* pseudo: string - required and unique
* email : string - required and unique
* password : string - chopped
* avatar_slug : string, default : male avatar picture
* likes : array - required, default [] 
* admin_role : boolean - required, default : false
* createdAt : datetime - generate automaticaly
* updatedAt: datetime - generate automaticaly

## Posts
* _id : integer - required and unique, generate automaticaly
* posterId : string - required
* message : string - maxlength : 500
* picture : string
* video : string
* likers : array - required, default []
* createdAt : datetime - generate automaticaly
* updatedAt: datetime - generate automaticaly
### comments : sub database of Posts (array) with inside :
- commenterId: string
- commenterPseudo: string
- text : string
- timestamp : number


## API specification
|      | Access Point | Request body | Expected answer | Function |
| :--: | :----------: | :----------: | :-------------: | :------- |
|  |  | USER |  |  |
| POST | /api/user/signup | {email: string, password: string, pseudo: string, avatar_slug: string (optional)} | {message: string, userId: string} | password chopped, add user in database |
| POST | /api/user/login | {email: string, password: string} | {message: string, userId: string} | Check user id and password, decrypt password, create authentification token and add it in cookie. |
| GET | /api/user/logout | - | redirection to login page | Unset 'jwt' cookie (authentification token) |
| GET | /api/user | - | Object of users | Return an object with all users of database |
| GET | /api/user/:id | - | single object user | Return an object which contains a user searched by id |
| PUT | /api/user/:id | {email: string (optional), password: string (optional), pseudo: string (optional), avatar_slug: string (optional)} | single object user | Update user info |
| DELETE | /api/user/:id | - | {message: string, user deleted object} | Erase user of database  |
| POST | /api/user/upload |  |  | for avatar upload |
|  |  | POST |  |  |
| GET | /api/post | - | Object of all posts | return an object with all posts of database and rank them in descending creation date order |
| POST | /api/post | {posterId: string, message: string, video: string (optional), picture: string (optional)} | {message: string, post created object} | Create post in database |
| PATCH | /api/post/:id | {message: string (optional), video: string (optional), picture: string (optional)} | {message: string, post updated object} | Update post |
| DELETE | /api/post/:id | - | {message: string, post deleted object} | Remove the post |
|  |  | LIKE |  |  |
| PATCH | /api/post/like/:id | {likerId: string} | {message: string, like user object} | Like post. Add likers id in likers array from post model and add post liked id in likes array from user model. |
| PATCH | /api/post/unlike/:id | {likerId: string} | {message: string, unlike user object} | Unlike post. Delete likers id in likers array from post and delete post liked id in likes array from user. |
|  |  | COMMENTARY |  |  |
| PATCH | /api/post/comment/:id | {commenterId: string, commenterPseudo: string, text : string} | {message: string, post updated object} | Add comment in post sub database (comment array in post model). |
| PATCH | /api/post/edit-comment/:id | {commentId: string, text: string} | {message: string, post updated object} | Update existing commentary in post sub database (comment array in post model). |
| DELETE | /api/post/delete-comment/:id | {commentId: string} | {message : string, commentary deleted object} | Erase commentary in post sub database (comment array in post model). |
