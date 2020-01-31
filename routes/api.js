const express = require('express');
const router = express.Router();
const alarmClock = require('../alarmclock/alarmclock')

router.get('set-alarm', function(req, res, next) {
  res.json({ newTime: setTime })
});

module.exports = router;
