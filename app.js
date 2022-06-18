if (process.env.NODE_ENV != "production") require("dotenv").config();
const express = require('express')
const router = require('./router')
const app = express()
const port = process.env.PORT || 4200
const {run, getDb} = require('./config/mongoDB')
const cors = require('cors')

app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
    try{
        res.json({msg: 'success connected'})
    }
    catch (error) {
        res.status(500).json(error)
    }
})

run()
    .then(_ =>{
        app.listen(port, ()=> console.log(`listening at port ${port}`))
    })
    .catch(err => {
        console.log(err)
    })