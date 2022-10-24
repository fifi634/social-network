readme in progress / project in progress

# Groupomania
Fictif mission for OpenClassRooms studies. This app is an internal social network for Groupomania company.

## Global features
* Login : with secure data
* Sign-up : with secure data
* Profil: update user information and delete acount exept admin
* Homepage : display post of all users if authentified
* Post : with text and picture, update or del it by only create poster and admin
* Like post system : with anti cheat
* Authentification persisting during 1 day
* You can personalize colors interface in `client/src/config.js`
* Admin acount - id: admin@groupomania.com / password: admin

## Requirement

>>> NOTE for P7 OpenClassRooms audition : You don't have need to create a MongoDb Atlas account, my personal Atlas is already set up.

* Node.js : https://nodejs.org
* An account on MongoDB Atlas server (free version for test and develop): https://www.mongodb.com/fr-fr/pricing 
* Clone this project in your work directory
  `git clone https://github.com/fifi634/social-network.git` (this command will create 'social-network' directory)

## Back-end configuration (Atlas by MongoDB)

>>> Note for P7 audition (28, october 2022): '.env' file is complete and it's into this Github. You haven't need to create and set it.

You must create '.env' files in `api/config/` directory with inside :

`# Server config :`

`PORT = '5000'` 5000 is default port, you can set other port 

`# Mongo DB config :`

`MONGO_ID = 'your Mongo ID'`

`MONGO_PASSWORD = 'Your Mongo password'`

`MONGO_CLUSTER = 'Your slug of Mongo cluster'`

`MONGO_PROJECT = 'Your Mongo project name'`

`# Authentication token`

`RANDOM_TOKEN_SECRET = 'your token keys'`

`# URL client domain :`

`DOMAIN_CLIENT_APP = 'http://localhost:3000'` default client slug, you can set other slug client app, 

## Running backend
* Since the project directory (social-network/), in cli go to backend directory :
  `cd api`
* Install all instances for the first start
  `npm install`
* Launch backend server
  `node server`

## Front-end configuration
You can set a personnal url of backend server in `client/src/config.js` :

`// URL API adress of backend setting`

`// !!! BE CAREFUL !! This url must finish by a slash ( .../ )`

`export const fetchUrl = 'http://localhost:5000/';` this is a default backend slug

## Running frontend
* Since the project directory (social-network/), in cli go to frontend directory :
  `cd client`
* Install all instances for the first start
  `npm install`
* Launch frontend server
  `npm run start`


# Database

## Users
* _id : integer - required and unique, generate automaticaly
* pseudo: string - required
* email : string - required and unique
* password : string - chopped
* avatar_slug : string, default : "uploads/profil/male_avatar.svg"
* likes : array - required, default [] 
* admin_role : boolean - required, default : false
* createdAt : datetime - generate automaticaly
* updatedAt: datetime - generate automaticaly

## Posts
* _id : integer - required and unique, generate automaticaly
* posterId : string - required
* message : string
* picture : string
* likers : array - required, default []
* createdAt : datetime - generate automaticaly
* updatedAt: datetime - generate automaticaly


## API specification
|      | Access Point | Request body | Expected answer | Function |
| :--: | :----------: | :----------: | :-------------: | :------- |
|  |  | USER |  |  |
| POST | /api/user/signup | {email: string, password: string, pseudo: string, avatar_slug: string (optional)} | {message: string, userId: string} | password chopped, add user in database |
| POST | /api/user/login | {email: string, password: string} | {message: string, userId: string} | Check user id and password, decrypt password, create authentification token and add it in cookie. |
| GET | /api/user/logout | - | redirection to login page | Unset 'jwt' cookie (authentification token) |
| GET | /api/user | - | Object of users | Return an object with all users of database |
| GET | /api/user/:id | - | single object user | Return an object which contains a user searched by id |
| PATCH | /api/user/ | {password: string, pseudo: string, avatar_slug: string} | single object user | Update user info |
| DELETE | /api/user/ | - | {message: string} | Erase user of database  |
|  |  | POST |  |  |
| GET | /api/post | - | Object of all posts | return an object with all posts of database |
| POST | /api/post | {posterId: string, message: string (optional if picture set), picture: string (optional if message set)} | {message: string, post created object} | Create post in database |
| PATCH | /api/post/:id | {message: string, post._id: string)} | {message: string, post updated object} | Update post |
| DELETE | /api/post/ | - | {message: string} | Remove the post |
|  |  | LIKE |  |  |
| PATCH | /api/post/like/:id | {likerId: string} | {message: string, like user object} | Like post. Add likers id in likers array from post model and add post liked id in likes array from user model. |
| PATCH | /api/post/unlike/:id | {likerId: string} | {message: string, unlike user object} | Unlike post. Delete likers id in likers array from post and delete post liked id in likes array from user. |

