const router = require("express").Router();
const PetController = require("../controllers/PetController");

//Middleware
const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post(
  "/register",
  verifyToken,
  imageUpload.array("images"),
  PetController.register
);

module.exports = router;
