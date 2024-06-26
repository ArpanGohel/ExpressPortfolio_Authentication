/*COMP 229-Express Portfolio Authentication - Student name: Arpan Gohel - StudentID:300565463 - Oct26,2022*/

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User Model instance
let userModel = require('../models/user')
let User = userModel.User; //alias

module.exports.displayHomePage = (req, res) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayHomePage = (req, res) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayAboutPage = (req, res) => {
    res.render('about', {title: 'About Me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayProjectsPage = (req, res) => {
    res.render('projects', {title: 'Projects', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayServicesPage = (req, res) => {
    res.render('services', {title: 'Services', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayContactPage = (req, res) => {
    res.render('contact', {title: 'Contact Me', displayName: req.user ? req.user.displayName : ''});
}

module.exports.displayLoginPage = (req, res) => {
    // check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        })
    }
    else 
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //server err?
        if(err)
        {
            return next(err);
        }
        // is there a user login error?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    }) (req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in 
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res) => {
    //instantiate a user object
    let newUser = new User({
        username: req.body.username,
        //password: req.body.passsword
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User ALready Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            // if no error exists, then registration is successful
            // redirect the user and authenticate them
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout(function(err){
      if(err){return next(err);}
    res.redirect('/');
    });
}