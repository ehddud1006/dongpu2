const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
// async를 사용하면 try catch문을 사용해야한다.
router.post("/register", async (req, res) => {
    try {
        // 포스트맨에서 bcrypt를 사용하지 않았을때는 에러가 났는데 
        // 사용을 하니 에러가 안난다. 이유가 뭘까..
        // 아 이유를 알았다 ㅋㅋ hashedPass가 안고쳐져있었네.
        // 그대로 복붙해서 생긴 오류였다.

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        // user가 없거나 status(400)인 경우 
        !user && res.status(400).json("Wrong credentials!");

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Wrong credentials!");

        // password를 제외한 나머지만 json으로 반환한다.
        const { password, ...others } = user._doc;
        res.status(200).json(others);
        // res.status(200).json(user)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;