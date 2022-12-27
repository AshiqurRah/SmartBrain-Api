const express = require('express')

const app = express();

app.get('/', (req,res)=> {
    res.send('this is working')
})

app.post('/signin', (req, res) => {
    res.send('signing in')
})

app.listen(3000, () => {
    console.log("listening to port 3000");
})

