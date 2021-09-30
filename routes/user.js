const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const userController = require("../controllers/userController");

router.post("/login", catchErrors(userController.login));
router.get("/login", catchErrors(userController.logins));
router.post("/register", catchErrors(userController.register));
router.get("/register", catchErrors(userController.registers));

router.get("/", catchErrors(userController.home));

module.exports = router;
