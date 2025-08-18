const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();

app.use("/admin", adminAuth);

app.get("/user/userData", userAuth, (req, res, next) => {
  res.send("User data");
});

app.get("/user/login", (req, res, next) => {
  res.send("Logged In");
});

app.get("/admin/getAllData", (req, res, next) => {
  return res.send("All data got");
});

app.get("/admin/deleteData", (req, res, next) => {
  return res.send("Delete data succesfully");
});

app.get("/error", (req, res, next) => {
  // Always use try catch
  try {
    throw new Error("ABCBCBCK");
  } catch (err) {
    res.status(500).send("Please contact admin");
  }
});

// One way to handle (Brahmastra)
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});

// app.use(
//   "/user",
//   [
//     (req, res, next) => {
//       // res.send("Test");
//       next();
//     },
//     (req, res, next) => {
//       // res.send("Test2");
//       next();
//     },
//   ],
//   (req, res, next) => {
//     // res.send("Test3");
//     next();
//   }
// );

// app.get(
//   "/users",
//   [
//     (req, res, next) => {
//       // res.send("Test");
//       next();
//     },
//     (req, res, next) => {
//       // res.send("Test2");
//       next();
//     },
//   ],
//   (req, res, next) => {
//     res.send("Test3");
//     next();
//   }
// );

// app.get("/user/:id/:name", (req, res) => {
//   console.log(req.params);
//   res.send({
//     firstName: "Akash",
//     lastName: "Shaw",
//   });
// });

// app.post("/user", (req, res) => {
//   res.send("Data saved successfully");
// });

// app.delete("/user", (req, res) => {
//   res.send("Data deleted successfully");
// });

app.listen(3000, () => {
  console.log(`Running on port 3000`);
});
