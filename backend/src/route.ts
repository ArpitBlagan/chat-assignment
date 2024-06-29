import { Router } from "express";
import { deleteMessage, getMessage, imageUpload } from "./controller/message";
import {
  login,
  register,
  addFriend,
  getFriends,
  searchUser,
  logout,
} from "./controller/user";
import { validateToken } from "./middleware";
import multer from "multer";
import path from "path";
export const router = Router();
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage, limits: { fileSize: 1000000 } });
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").get(logout);
router.route("/upload/file").post(upload.single("file"), imageUpload);
router.use(validateToken);

router.route("/friends").get(getFriends);
router.route("/search").get(searchUser);
router.route("/addFriend").patch(addFriend);
router.route("/conversation").get(getMessage).delete(deleteMessage);
router.route("/isloggedin").get((req, res) => {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,
  });
});
