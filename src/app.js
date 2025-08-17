const express = require("express");
const app = express();

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.use("/test1", (req, res) => {
  res.send("first");
});
app.use("/dashboard", (req, res) => {
  res.send("2");
});

app.listen(3000, () => {
  console.log(`Running on port 3000`);
});
