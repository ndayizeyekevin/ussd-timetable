const express = require("express");
const responseGenerator = require("./utils/responseGenerator");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/", (req, res) => {
  res.send("api is working");
});
app.post("/", (req, res) => {
  const { text, phoneNumber } = req.body;

  const response = responseGenerator(text);
  res.send(response);
});
app.listen(3000, () =>
  console.log("server is learning on http://localhost:3000")
);
