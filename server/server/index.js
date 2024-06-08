const express = require('express');
const cors = require('cors');
// const session = require('express-session');
// const passport = require('./config/passportConfig');

require('dotenv').config();

const connectToMongo = require('./db/connection');
const cookieParser = require('cookie-parser');
// routes
const authRoutes = require('./routes/auth/auth');
const ticketRoutes = require('./routes/tickets/ticket');

const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.NODE_LOCAL_TEST_PORT : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// these are causign errors so I commented them
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/projects/:projectId/tickets', ticketRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get('/test', (req, res) => {
  res.json('Server connection to client works!!  Good Luck with your capstones :D');
});

module.exports = app;
