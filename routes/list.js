const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandlers");
const listController = require("../controllers/listController");



const auth = require("../middlewares/auth");
const verify = require("../middlewares/verify");

router.get("/", auth, catchErrors(listController.getAllList));
router.post("/", auth, catchErrors(listController.createList));
router.get("/:id", auth, catchErrors(listController.getList)); //get list by list id or get all list of user
router.put("/:id", auth, catchErrors(listController.updateList));
router.delete("/:id", auth, catchErrors(listController.deleteList))
//---------------------------------------------------------------

// router.get("/", auth, verify, catchErrors(listController.getAllByFilter));
//this route is to get lists according to filters as well as without filters
// //in query pass category/title to find or sort= new/old to find list
// router.get("/user/:userId", auth, catchErrors(listController.getUserList));
// router.get("/all/:id", auth, catchErrors(listController.getAllListAdmin));
// -------------------------------------------------------------------------------------------

router.get("/user/", auth, catchErrors(listController.getUserList2));
router.put("/like/:id", auth, catchErrors(listController.likeList));
router.put("/unlike/:id", auth, catchErrors(listController.unlikeList));
router.post("/rating/:id",auth,catchErrors(listController.addRating));
router.get("/rating/",auth,catchErrors(listController.getByRating));
router.get("/done",auth,catchErrors(listController.doneList));



module.exports = router;
