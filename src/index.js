const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema/schema')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

//database
const connectString = "mongodb://127.0.0.1:27017/library";
mongoose.connect(connectString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() =>console.log("MongoDB connected"))
        .catch(err => console.log("error connecting to mongodb", err))




//setGraphQL Schema
//all queries will go through this route
app.use('/graphql', cors(), bodyParser.json(), expressGraphQL({
    schema,
    graphiql: true
}))

if(['production', 'ci'].includes(process.env.NODE_ENV)) {
    app.use(express.static('client/build'))

    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'))
    })
}

//Start Server
const PORT = process.env.PORT || 5000
app.listen(4000, () => {
    console.log('listening port 4000')
})