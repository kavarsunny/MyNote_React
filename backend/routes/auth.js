const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const { toBeInTheDocument } = require("@testing-library/jest-dom/matchers");
const JWT_SECRET = "sunnyisbadb$oy";
const fetchuser = require("../middleware/fetchuser");
//user:using POST"/API/AUTH"

router.post(
  "/createuser",
  [
    body("email", "enter a valid name").isEmail(),
    body("name", "enter a valid email").isLength({ min: 3 }),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success,error: "email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      //   .then(user => res.json(user))
      //   .catch(err=>{console.log(err)
      // res.json({error:'enter other mailid'})})
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
success=true;
      res.json({ success,authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("error");
    }
  }
);
//authh user using : /api/auth/login
router.post(
  "/login",
  [
    body("email", "enter a valid mail").isEmail(),
    body("password", "enter a valid password").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ error: "try with corrext credentials" });
      }

      const passwordcompare = await bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        {
          success = false;
          return res
            .status(400)
            .json({ success, error: "try with corrext credentials" });
        }
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send(" server error");
    }
  }
);

//route:3 get user details API/AUTH/GETUSER
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(" server error");
  }
});
module.exports = router;
