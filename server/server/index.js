// server\server\index.js
const express = require('express');
const cors = require('cors');
// const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const passport = require('passport');
const os = require('os');

require('dotenv').config();

// middleware and utils
const connectToMongo = require('./db/connection');
const { printAllRoutes } = require('./util/devHelpers');
const verifyJWT = require('./middleware/verifyJWT');

// routes.
const authRoutes = require('./routes/auth/auth');
const adminRoutes = require('./routes/admin/admin');
const projectRoutes = require('./routes/project/project');
const notificationRoutes = require('./routes/notification/notification');
const userRoutes = require('./routes/user/userProfileRoute');
const contactUsRoute = require('./routes/contactUs/ContactUs');
const dashboardRoutes = require('./routes/dashboard/main');
const analyticsRoutes = require('./routes/analysis/analytics');

const app = express();

//set up socketIo
const server = http.createServer(app);
const io = socketIo(server);

const port =
  process.env.NODE_ENV === 'test'
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT || 4000;

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.static('server/public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.get('/test', (req, res) => {
  res.json(
    'Server connection to client works!!  Good Luck with your capstones :D'
  );
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes); // temporary admin routes
app.use('/api/v1', contactUsRoute);

app.use(verifyJWT); // everything below this line will use verifyJWT
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/notifications', notificationRoutes);

app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/analytics', analyticsRoutes);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Function to get the local network IP address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (let name of Object.keys(interfaces)) {
    for (let iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}
app.listen(port, () => {
  const localIpAddress = getLocalIpAddress();
  const serverUrl = `http://${localIpAddress}:${port}`;
  // this line for dev, uncomment it if you want to log all working routes
  printAllRoutes(app);
  console.log(`Server listening at ${serverUrl}`);
  connectToMongo();
});

module.exports = app;
