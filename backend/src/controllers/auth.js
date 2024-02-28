const {Router} =  require('express');
const Users = require('../schemas/userschema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router =  Router();

//get all users
router.route('/users').get(async (req,res)=>{
    try{
        let userData = await Users.find();
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//register a new user
router.route('/register').post(async (req,res)=>{
    const {name, email, password} = req.body;

    try{
        let user = await Users.findOne({email});

        if(user){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new Users({name, email, password: hashedPassword});

        await user.save();

        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

//login a user
router.route('/login').post(async (req,res)=>{
    const {email, password} = req.body;

    try{
        let user = await Users.findOne({email});

        if(!user){
            return res.status(400).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"});
        }

        const token = jwt.sign({_id: user._id}, process.env.SECRET_KEY);

        res.status(200).json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;