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
router.get("/", PetController.getAll);
router.get("/mypets", verifyToken, PetController.getAllUserPets);
router.get("/myadoptions", verifyToken, PetController.getAllUserAdoptions);
router.get("/:id", PetController.getById);
router.delete("/:id", verifyToken, PetController.deleteById);
router.patch(
  "/:id",
  verifyToken,
  imageUpload.array("images"),
  PetController.updatePet
);

module.exports = router;
