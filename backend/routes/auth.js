const router = require('express').Router();
const Auth = require("../models/auth")

const { register , login , forgotpassword , resetpassword } = require("../controllers/auth");
 
//bellow routes map the controllers
router.route("/register").post(register); // call the auth in controllers

router.route("/login").post(login);

router.route("/forgotpassword").post(forgotpassword);

router.route("/passwordreset/:resetToken").put(resetpassword);

router.route("/").get(async (req, res) => {
    await Auth.find()
    .then((auth) => res.json(auth))
    .catch((error) => res.status(500).json({ success: false, error: error}));
});

//route for getting a relavant document using id
router.route("/get/:id").get(async (req, res) => {
    const { id } = req.params;

    await Auth.findById(id)
    .then((auths) => res.json(auths))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for deleting a relavant document using id
router.route("/delete/:id").delete(async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params;

    await Auth.findByIdAndDelete(id) //find the document by id and remove
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

//route for updating a relavant document using id
router.route("/update/:id").put(async (req, res) => {
    //backend route for updating relevant data and passing back
    const { id } = req.params;

    const {
        firstName,
        lastName,
        nicNumber,
        password,
        telephoneNumber
    } = req.body;
    
    //find the document by id and update the relevant data
    await Auth.findByIdAndUpdate(id, {
        firstName,
        lastName,
        nicNumber,
        password,
        telephoneNumber
    })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

module.exports = router;