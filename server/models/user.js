/*COMP 229-Express Portfolio Authentication - Student name: Arpan Gohel - StudentID:300565463 - Oct26,2022*/

// require modules for the user model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let User = mongoose.Schema
(
    {
        username:

        {
            type: String,
            default: '',
            trim: true,
            required: 'username is required'

        },
        /*
        password:
        {
            type: string,
            default: '',
            trim: true,
            required: 'password is required'
        }*/
        email:
        {
            type: String,
            default: '',
            trim: true,
            required: 'email address is required'
        },
        displayName:
        {
            type: String,
            default: '',
            trim: true,
            required: 'Display Name is required'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        update:
        {
            type: Date,
            default: Date.now
        },
    },
        
    {
        collection: "users"
    }
)

// configure options for user model

let options = ({missingPasswordError: 'Wrong / Missing Password'});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);
