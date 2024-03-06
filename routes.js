const express = require("express");
const { sendPushNotification } = require("./controller");

const router = express.Router();

router.post("/push", sendPushNotification);
module.exports = router;
