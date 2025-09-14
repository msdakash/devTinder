const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        throw new Error("Invalid Status type");
      }

      // if (fromUserId === toUserId) {
      //   throw new Error("User cannot be same");
      // }

      const validUserId = await User.findById(toUserId);

      if (!validUserId) {
        throw new Error("User not found");
      }

      const existingConnectionrequest = await ConnectRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionrequest) {
        throw new Error("Connection Already Exists");
      }

      const connectionRequest = new ConnectRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res
        .json({
          message: "connection request send successfully",
          data,
        })
        .send();
    } catch (err) {
      res
        .status(400)
        .json({
          message: err.message,
        })
        .send();
    }
  }
);

module.exports = requestRouter;
