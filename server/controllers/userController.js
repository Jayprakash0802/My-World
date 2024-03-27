const HttpError = require('../models/errorModels')
const User = require('../models/userModels')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { v4: uuid } = require('uuid')
const { getUri } = require("../cloudinary/dataUrl")
const { cloudinary, uploadAvatar } = require('../cloudinary/cloudinary');

// Register a new user
const registerUser = async (req, res, next) => {
    try {

        const { name, email, password, confirmpass } = req.body;
        if (!name, !email, !password) {
            return next(new HttpError("Fill in all the fields", 422))
        }

        const newEmail = email.toLowerCase()

        const emailExists = await User.findOne({ email: newEmail });
        if (emailExists) return next(new HttpError("Email already exists", 422))

        if ((password.trim()).length < 6) return next(new HttpError("Password length must be atleast 6 characters"), 422)

        if (password != confirmpass) return next(new HttpError("Password doesn't match", 422));

        const salt = await bcrypt.genSalt(10);
        const hasPass = await bcrypt.hash(password, salt);
        const newUser = await User.create({ name, email: newEmail, password: hasPass });
        res.status(201).json(`New user ${newUser.email} registered`);

    } catch (error) {
        return next(new HttpError("Registration failed", 422))
    }

}

// login a registered user
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // res.json({email,password})
        if (!email || !password) return next(new HttpError("Fill in all the fields", 422));

        const newEmail = email.toLowerCase();
        // console.log(newEmail);
        const user = await User.findOne({ email: newEmail });

        if (!user) return next(new HttpError("Invalid credentials", 422))

        const comparePass = await bcrypt.compare(password, user.password);
        if (!comparePass) return next(new HttpError("Invalid credentials", 422))

        const { _id: id, name } = user;
        const token = jwt.sign({ id, name }, process.env.JWT_SECRET, { expiresIn: '1m' })  

        res.status(200).json({ token, id, name })

    } catch (error) {
        return next(new HttpError("Login failed, check your credentials", 422))
    }

}

// user detail
const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password');
        if (!user) return next(new HttpError("User not found", 404))
        res.status(200).json(user);

    } catch (error) {
        return next(new HttpError(error))
    }

}
// update avatar
const changeAvatar = async (req, res, next) => {
    try {
        
        if (!req.file) return next(new HttpError("Please upload an image", 422))

        const user = await User.findById(req.user.id)

        if (user.avatar.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id, async (err,result) => {
                if (err) return next(new HttpError(err));
            })
        }
        const file = req.file;
        if (file.size > 20000000) return next(new HttpError('image should be less than 2mb', 422));
        const uri = getUri(file)

        await cloudinary.uploader.upload(uri, uploadAvatar, async (err, result) => {
            if (err) return next(new HttpError(err));
            const { public_id, url } = result
            const updatedAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: { public_id, url } }, { new: true });
            if (!updatedAvatar) return next(new HttpError("image couldn't be changed", 422))
            res.status(200).json(updatedAvatar)

        })

        // let filename = avatar.name
        // let splittedFilename = filename.split('.')
        // let newFilename = splittedFilename[0] + uuid() + '.' + splittedFilename[splittedFilename.length - 1]
        // avatar.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
        //     if (err) return next(new HttpError(err))
        //     const updateAvatar = await User.findByIdAndUpdate(req.user.id, { avatar: newFilename }, { new: true })
        //     if (!updateAvatar) return next(new HttpError("image couldn't be changed", 422))
        //     res.status(200).json(updateAvatar)
        // })

    } catch (error) {
        return next(new HttpError("Unable to update avatar", 422))
    }

}


// edit details
const editUser = async (req, res, next) => {
    try {
        const { name, email, currpass, newpass, confirmpass } = req.body
        if (!name || !email || !currpass || !newpass) {
            return next(new HttpError("Fill in all fields", 422))
        }

        const user = await User.findById(req.user.id);
        if (!user) return next(new HttpError("User not found", 404))

        const emailExists = await User.findOne({ email })
        if (emailExists && emailExists._id != req.user.id) return next(new HttpError("User already exist"), 422)
        const validateUserpass = await bcrypt.compare(currpass, user.password)
        if (!validateUserpass) return next(new HttpError("Invalid password", 422))
        if (newpass !== confirmpass) return next(new HttpError("New password doesn't match", 422))
        const salt = await bcrypt.genSalt(10)
        const Hash = await (bcrypt.hash(newpass, salt));
        const newInfo = await User.findByIdAndUpdate(req.user.id, { name, email, password: Hash }, { new: true })
        res.status(200).json(newInfo)

    } catch (err) {
        return next(new HttpError(err))
    }

}



//get authors
const getAuthors = async (req, res, next) => {
    try {
        const authors = await User.find().select('-password');
        res.json(authors)
    } catch (error) {
        return next(new HttpError(error));
    }

}

module.exports = { registerUser, getUser, getAuthors, editUser, changeAvatar, loginUser };