const express = require("express");
const route = require("./routes");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send(`<h2>Cloud Messaging Notification</h2>`);
});

app.use("/message", route);
app.listen(8000, () => {
  console.log(`Server Running on port 8000`);
});
