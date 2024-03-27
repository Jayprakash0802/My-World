const { Router } = require("express")

const authMiddleware = require("../middleware/authMiddleware")
const {getUser,registerUser, getAuthors, loginUser, editUser, changeAvatar} = require("../controllers/userController")
const {upload} = require("../cloudinary/multer");

const router = Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/:id",getUser)
router.get("/",getAuthors)
router.post("/change-avatar",authMiddleware,upload,changeAvatar)
router.patch("/edit-user",authMiddleware,editUser)

module.exports = router





















router.get('/', (req, res, next) => {
    res.json("This is user route")
})

module.exports = router;