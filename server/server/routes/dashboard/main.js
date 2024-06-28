const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/Dashboard/dashboardController');

router.get('/', dashboardController.mainPage);


module.exports = router;
