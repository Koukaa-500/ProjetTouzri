const express = require ('express');
const router = express.Router();
const user = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// register TEMCHI Mrigla
router.post('/register', async (req, res) => {
    

    try {
        data = req.body;
        u = new user(data);
        // Check if the email is already in use
        let checkEmail = await user.findOne({email:u.email});
        if(checkEmail){
            return res.status(409).send("This email address is already registered.");
            }else{
                // Hash password before saving to database

        salt = bcrypt.genSaltSync(10);
        cryptedPass = bcrypt.hashSync(data.password, salt);
        u.password = cryptedPass;
        savedUser = await u.save();
            }
        res.status(200).send({"registration done! welcome in our website" : savedUser.name});
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: 'Registration failed' });
    }
});
//login TEMCHI Mrigla
router.post('/login', async (req,res)=>{
    try{
    data = req.body;
    u = await user.findOne({email:data.email})
    if(!u){
         res.status(401).send("User not found");
    }
    else{
        let validPass = await bcrypt.compareSync(data.password , u.password);
        if(!validPass){
           res.status(401).send("Invalid Password")
        }
        else{
            payload = {
                _id : u._id,
                email : u.email,
                name: u.name
            }
            token = jwt.sign(payload ,'123456789')
            res.status(200).json({message : "login successfully!"})
        }
    }}catch (error){
        res.status(404).send(error)
    }
})


module.exports = router ;