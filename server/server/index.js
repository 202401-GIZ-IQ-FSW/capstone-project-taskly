const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// middleware and utils
const connectToMongo = require('./db/connection');
const { printAllRoutes } = require('./util/devHelpers');
const verifyJWT = require('./middleware/verifyJWT');

// routes
const authRoutes = require('./routes/auth/auth');
const adminRoutes = require('./routes/admin/admin');
const projectRoutes = require('./routes/project/project');
const userRoutes = require('./routes/user/userProfileRoute');
const ticketRoutes = require('./routes/tickets/ticket');
//importing the notification routes
const notificationRoutes = require('./routes/notification/notification');

const app = express();

//set up socketIo
const server = http.createServer(app);
const io = socketIo(server);

const port =
  process.env.NODE_ENV === 'test'
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('/test', (req, res) => {
  res.json(
    'Server connection to client works!!  Good Luck with your capstones :D'
  );
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes); // temporary admin routes

app.use(verifyJWT); // everything below this line will use verifyJWT
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/projects', ticketRoutes);
app.use('/api/v1/notifications', notificationRoutes);


// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.listen(port, () => {
  // this line for dev, uncomment it if you want to log all working routes
  printAllRoutes(app);
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

module.exports = app;
