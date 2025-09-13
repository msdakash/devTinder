const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const { userAuth } = require("./middlewares/auth");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    //Validation of the data

    validateSignUpData(req);

    // Encrypt the data

    const { firstName, lastName, emailId, password, age, gender } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
    });
    await user.save();
    res.send("Data saved successfully");
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login successfully");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     // const users = await User.find({ emailId: userEmail });
//     // if (users.length === 0) {
//     //   res.status(404).send("User not found");
//     // }

//     const user = await User.findOne({ emailId: userEmail });
//     if (!user) {
//       res.status(404).send("User not found");
//     }
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.send(user);
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     await User.findByIdAndDelete(userId);
//     res.send("User deleted ");
//   } catch (err) {
//     res.status(400).send("Something went wrong");
//   }
// });

// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = ["age", "skills", "about"];

//     const isUpdateAllowed = Object.keys(data).every((key) =>
//       ALLOWED_UPDATES.includes(key)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed");
//     }

//     if (data.skills.length > 10) {
//       throw new Error("Max 10 skills allowed");
//     }

//     await User.findOneAndUpdate({ _id: userId }, data, {
//       runvalidators: true,
//     });

//     // By Email
//     // await User.findOneAndUpdate({ emailId: userId }, data, {
//     //   runValidators: true,
//     // });

//     res.send("User data updated ");
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// });

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
