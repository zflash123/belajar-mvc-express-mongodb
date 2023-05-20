//js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
    res.render('register', {
    })
}

//For Login View
const loginView = (req, res) => {
    res.render('login', {
    })
}

// POST request that handles register
const registerUser = (req, res) => {
    const {name, email, password, location, created_at} = req.body
    if(!name || !email || !password || !location || !created_at){
        console.log('There is field that has empty value')
    }
    //Confirm Passwords
    if (password !== confirm){
        console.log('Password must match')
    } else {
        //Validation
        User.findOne({ email: email }).then((user) => {
            if(user){
                console.log('email exists')
                res.render('register', {
                    name,
                    email,
                    password,
                    confirm,
                })
            } else {
                //Validation
                const newUser = new User({
                    name,
                    email,
                    location,
                    password,
                })
                //Password Hashing
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(res.redirect('/login'))
                            .catch((err) => console.log(err));
                    })
                );
            }
        })
    }
}

module.exports = {
    registerView,
    loginView
}