const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session)
const MONGODB_URI = "mongodb+srv://milos381:pass@cluster0.3relt.mongodb.net/teacher-app?retryWrites=true&w=majority"

const app = express()
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessionsTeacher'
})
app.use(session({secret:'my secret', resave: false, saveUninitialized: false, store: store}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(cors())


const authRoutes = require('./routes/auth-routes');
const classRoutes = require('./routes/class-routes');
const errorController = require('./controllers/error')



app.use('/api/teacher', authRoutes);
app.use('/api/class', classRoutes);
app.get('/*', (req, res, next) => {
  
  res.sendFile(path.resolve(__dirname, "../docs/index.html"))

})

app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));


  mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
    console.log('CONNECTED')
  })
  .catch(err => {
    console.log(err);
  });