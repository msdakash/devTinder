const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  res.send({
    firstName: "Akash",
    lastName: "Shaw",
  });
});
app.post("/user", (req, res) => {
  res.send("Data saved successfully");
});

app.delete("/user", (req, res) => {
  res.send("Data deleted successfully");
});

app.listen(3000, () => {
  console.log(`Running on port 3000`);
});
