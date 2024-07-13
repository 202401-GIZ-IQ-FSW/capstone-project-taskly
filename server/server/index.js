// server\server\index.js
const express = require('express');
const cors = require('cors');
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
const userRoutes = require('./routes/user/userProfileRoute');
const ticketRoutes = require('./routes/tickets/ticket');
const commentsRouter = require('./routes/comment/commentRoute');
const contactUsRoute = require('./routes/contactUs/ContactUs');
const dashboardRoutes = require('./routes/dashboard/main');
const reportRoute = require('./routes/letter/reportRoute');

const app = express();
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
app.use('/api/v1/projects', ticketRoutes);
app.use('/api/v1/projects', commentsRouter);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/reports', reportRoute);

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
