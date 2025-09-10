const express = require("express");
const connectDB = require("./config/database");
const user = require("./models/user");
const User = require("./models/user");
// const { adminAuth, userAuth } = require("./middlewares/auth");
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    // const users = await User.find({ emailId: userEmail });
    // if (users.length === 0) {
    //   res.status(404).send("User not found");
    // }

    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User deleted ");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["age", "skills", "about"];

    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data.skills.length > 10) {
      throw new Error("Max 10 skills allowed");
    }

    await User.findOneAndUpdate({ _id: userId }, data, {
      runvalidators: true,
    });

    // By Email
    // await User.findOneAndUpdate({ emailId: userId }, data, {
    //   runValidators: true,
    // });

    res.send("User data updated ");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
      console.log(`Running on port 3000`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// app.use("/admin", adminAuth);

// app.get("/user/userData", userAuth, (req, res, next) => {
//   res.send("User data");
// });

// app.get("/user/login", (req, res, next) => {
//   res.send("Logged In");
// });

// app.get("/admin/getAllData", (req, res, next) => {
//   return res.send("All data got");
// });

// app.get("/admin/deleteData", (req, res, next) => {
//   return res.send("Delete data succesfully");
// });

// app.get("/error", (req, res, next) => {
//   // Always use try catch
//   try {
//     throw new Error("ABCBCBCK");
//   } catch (err) {
//     res.status(500).send("Please contact admin");
//   }
// });

// // One way to handle (Brahmastra)
// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

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
