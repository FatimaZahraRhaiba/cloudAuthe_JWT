const express = require('express')
const app =express()

const Route=require('./routes/route')
const db=require('./db')
app.use(express.json())

app.listen(8000,()=>{
    console.log('running on port 8000')
})

app.use('/',Route)