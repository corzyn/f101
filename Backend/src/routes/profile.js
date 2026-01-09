const express = require("express");
const router = express.Router();
const {getUserCredentials,deleteUser,updateUser, getAllUsers} = require("../controllers/profileController");


router.get("/getUserCredentials/:id", getUserCredentials);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id",updateUser)
router.get("/users", getAllUsers);

module.exports = router;
