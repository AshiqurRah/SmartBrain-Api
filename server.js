const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: '',
        password: '',
        database: 'smart-brain'
    }

})

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (req,res)=> {
    res.send(database.users)
})

app.post('/signin', (req, res ) => {signin.handleSignin(req,res,db,bcrypt)})

// Create a transaction when there is need to do more things at once
app.post('/register', (req,res) => {register.handleRegister(req, res,db, bcrypt )})

app.get('/profile/:id' , (req,res) => {profile.handleProfile(req, res)})

app.put('/image' , (req, res) => {
   image.handleImage(req,res, db)
})

app.put('/imageurl' , (req, res) => {
    image.handleAPIcall(req,res, db)
 })




app.listen(3000, () => {
    console.log("listening to port 3000");
})

