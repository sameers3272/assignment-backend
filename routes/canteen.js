const express = require('express');
const canteenController = require('../controller/canteen');
const router = express.Router();

router.get('/', canteenController.getIndex);

module.exports = router;