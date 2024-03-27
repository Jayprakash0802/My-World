const express = require('express')
const cors = require('cors')
const { connect } = require('mongoose')
// const upload = require('express-fileupload')
require('dotenv').config()
const userRoutes = require("./routes/userRoutes");
const postsRoutes = require("./routes/postsRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware")
const session = require('express-session')
const MongoStore = require('connect-mongo')
// const bodyParser = require('body-parser')

const app = express();
const PORT = process.env.PORT || 5000;
//session middleware
app.use(
    session({
        secret: "secret key",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URL,
            ttl:   60
        }),
        cookie: {
            maxAge: 60 * 1000,
            secure: false,
        },
    })
)

app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
// app.use(upload())
// app.use('/uploads',express.static(__dirname + '/uploads'))

app.use('/api/users', userRoutes);
app.use('/api/posts', postsRoutes);

app.use(notFound)
app.use(errorHandler)


connect(process.env.MONGO_URL).then(
    app.listen(PORT, () => console.log("Server running on port 5000"))
).catch(e => {
    console.log(e);
})



