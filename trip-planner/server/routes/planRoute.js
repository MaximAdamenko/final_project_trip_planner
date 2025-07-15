const express = require('express');
const router = express.Router();
const { generatePlan } = require('../controllers/planController');

router.post('/plan', generatePlan);

module.exports = router;

