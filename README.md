readme in progress / project in progress

# Groupomania
Fictif mission for OpenClassRooms studies. This app is an internal social network for Groupomania company.

## Global features
* Login : with secure data
* Sign in : with secure data
* Homepage : display post of all users
* Post : with text and pictures / creation, modify and delete
* Like post system : with anti cheat
* Commentary

## Requirement
* Node.js : https://nodejs.org
* MySQL : https://dev.mysql.com/downloads/installer/
* Clone this project in your work directory
  `git clone https://github.com/fifi634/Groupomania.git`

## Running database (MySQL - Windows)
Since the project directory in cmd :
* go to database directory : `cd backend/database`
* import database in mysql : `mysql -u root -p groupomania < dump.sql`
* You must create .env files in backend directory with inside :
`MYSQL_USER = "your mysql user id"`  
`MYSQL_PASSWORD = "your mysql password"`  
`SEQUELIZE_HOST = "your database host"`  

So that this appication work correctly, your mysql account must have this privilege:
- DELETE
- INSERT
- SELECT
- UPDATE

## Running backend
* Since the project directory, in cli go to backend directory :
  `cd backend`
* Initialize your npm
  `npm install`
* Launch backend server
  `node server`

## Running frontend
* Since the project directory, in cli go to frontend directory :
  `cd frontend`
* Install all instances
  `npm install`
* Launch frontend server
  `npn run start`


# API

## Data users
* id : integer - unique identifier generate automaticaly
* email : string (max 255 characters)
* password_hash : string (max 255 characters) - chopped
* avatar_slug : string (max 255 characters)
* created_at : datetime - generate automaticaly
* admin_role : boolean - by default : false

## Data posts
* id : integer - unique identifier generate automaticaly
* user_id : integer
* post_content : string
* picture_slug : string (max 255 characters)
* like_statut : boolean - by default : false
* updated_at : timestamp

## Data commentaries
* id : integer - unique identifier generate automaticaly
* post_id : integer
* user_id : integer
* commentary_content : string
* created_at : timestamp

## API specification
|      | Access Point | Request body | Expected answer | Function |
| :--: | :----------: | :----------: | :-------------: | :------- |
| POST | /api/user/signup | {email: string, password: string, avatar_slug: string, nickname: string} | {message: string} | password chopped, add user in database |
| POST | /api/user/login | {email: string, password: string} | {userId: integer, token: string} | user id check, send userId from database and a token web JSON signed (with userId) |
| GET | /api/posts | - | array of posts | return an array of all posts from database |
| GET | /api/posts/:id | - | single post | return a post with post id |
| POST | /api/posts | {post: string, image: File} | {message: string} | Capture and save the image, analyze the post transformed into a string characters and save it in the database in correctly defining its imageUrl. Initialize the likes and dislikes of the post to 0 and usersLiked and usersDisliked with empty tables. Notice than the request body initial is empty; when multer is added, it returns a chain for the body of demand dedpending on data submitted with the file. |
| PUT | /api/posts/:id | Either post as JSON or {post: string, image: File} | {message: string} | Update post with the _id provided. if an image is downloaded, it is captured and the imageUrl of the post is updated. Whether no file is provided, the content of the post is located directly in the request body. If a file is provided, the post transformed into a string characters is in req.body.post. Note that the body of the request initial is empty; when multer is added, it returns a chain from the body of the request based on data submitted with the file. |
| DELETE | /api/posts/:id | - | {message: string} | Remove the post with the _id provided |
| POST | /api/posts/:id/like | {userId: string, like: integer} | {message: string} | Define like statut for userId provided. If like = 1, user like the post (=like). If like = 0, user cancel his like or dislike. If like = -1, user don't like the post (=dislike). UserId must be added or removed from the board appropriate. This allows to keep track of their preferences and prevents them to like or not to dislike the same post several times: a user cannot have only one value for each post. The total number of "Likes" and "Dislike" are uptaded to each new rating. |
| POST | /api/posts/:id/comment | {comment : string} | {message: string} | Analyze the comment transformed into a string and save it in database. |
| GET | /api/posts/:id/comment | - | array of comment | return an array of comments from the post specified by id. |
