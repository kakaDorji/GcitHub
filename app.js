const express = require('express')
const userRouter = require('./routes/userRoutes')
const appRouter = require('./routes/appRoutes')
const viewRouter = require('./routes/viewRoutes')
const cookieParser = require('cookie-parser')
const path = require ('path')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(cookieParser())

app.use(express.json())
app.use(express.static(path.join(__dirname, 'views')))
app.use('/images', express.static(path.join(__dirname, 'views/img')));
app.use('/components', express.static(path.join(__dirname, 'views/components')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1/users', userRouter)
app.use('/api/v1/apps', appRouter)
app.use('/', viewRouter)

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    error: err.message
  });
});

module.exports = app