const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())
app.use(express.json())
app.use('/',require('./routes/api')) 

app.listen(9001, () => {
    console.log('Server started')
})