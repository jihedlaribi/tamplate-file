require('dotenv').config();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const User = require('../models/User');
const secret = process.env.secret



exports.register = async (req, res) => {
    const { fullName, email, password, age} = req.body
    try {
        let existantUser = await User.findOne({ email })
        if (existantUser) return res.send('user already exists')
        const newUser = new User({
            fullName, email, password, age
        })
        var salt = await bcrypt.genSalt(10);
        var hash = await bcrypt.hash(password, salt);
        newUser.password = hash
        await newUser.save()
        const payload = {
            id: newUser._id
        }
        const token = await jwt.sign(payload, secret)
        res.send({
            token, user: {
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                age: newUser.age,
              
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error.msg })
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        let existantUser = await User.findOne({ email })
        if (!existantUser) return res.status(400).json({ msg: "Bad credentials" })
        let isMatch = await bcrypt.compare(password, existantUser.password)
        if (!isMatch) return res.status(400).json({ msg: "Bad credentials" })
        const payload = {
            id: existantUser._id
        }
        const token = await jwt.sign(payload, secret)
        res.send({
            token, user: {
                _id: existantUser._id,
                fullName: existantUser.fullName,
                email: existantUser.email,
                age: existantUser.age,
           

            }
        })
    } catch (error) {


    }
}
exports.getUser = async (req, res) => {
    res.send(req.user)
}