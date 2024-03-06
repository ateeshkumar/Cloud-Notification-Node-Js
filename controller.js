const admin = require("firebase-admin");

var serviceAccount = require("./services.google.json");

const certPath = admin.credential.cert(serviceAccount);

// var FCM = new fcm(certPath);
const serverkey =
  "AAAAST35v-Q:APA91bErwVNNyE-3BooYsfNRAmT1q35TqyVz-KWysGQk4GBdcmJijqYaOXbBAQbc8L6y6-RV8NZaEL01Luh6X64_ubQO8yhU7pQ_hnIiCq7Z7dZ2FyY8Rou37LNyJ-f7MEQp8HOtYZb1";
var FCM = require("fcm-node");
var fcm = new FCM(serverkey);

exports.sendPushNotification = async (req, res, next) => {
  try {
    const { token, title, message } = req.body;
    // admin.initializeApp({
    //   credential: admin.credential.cert(serviceAccount),
    //   databaseURL: "https://logicmitra-caeba-default-rtdb.firebaseio.com",
    // });

    // console.log("Requesting permission...");
    // const messaging = getMessaging();
    // const token = await getToken(messaging, {
    //   vapidKey:
    //     "BANdfywQhr2wTwQey5g9neE1ubCm5VLDbwbGqXu7xODiu6ErRvnU7MBsqJnPNje3b861hTVEmj9V5nYbitnkB-0",
    // });

    var data = {
      to: token,
      collapse_key: "XXX",
      data: {
        my_key: "my value",
        contents: "abcv/",
      },
      notification: {
        title: title,
        body: message,
      },
    };
    fcm.send(data, function (error, resp) {
      if (error) {
        console.log(error);
        return res.status(500).send({
          response: "failed",
          message: "Something went wrong!!",
          error,
        });
      } else {
        return res.status(200).send({
          response: "success",
          message: "Message Send",
          resp,
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      response: "failed",
      message: "Internal Server Error",
      error,
    });
  }
};
