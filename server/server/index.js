const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/project/project')

require('dotenv').config();

const connectToMongo = require('./db/connection');
const cookieParser = require('cookie-parser');
// routes
const authRoutes = require('./routes/auth/auth');
const ticketRoutes = require('./routes/tickets/ticket');
const verifyJWT = require('./middleware/verifyJWT');

const app = express();
const port = process.env.NODE_ENV === 'test' ? process.env.NODE_LOCAL_TEST_PORT : process.env.NODE_LOCAL_PORT;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());



app.use('/api/v1/auth', authRoutes);
// routes for project crud
app.use(projectRoutes);


app.use(verifyJWT); // everything below this line will use verifyJWT
app.use('/api/v1/projects/:projectId/tickets', ticketRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.get('/test', (req, res) => {
  res.json('Server connection to client works!!  Good Luck with your capstones :D');
});

module.exports = app;
