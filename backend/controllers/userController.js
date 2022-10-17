const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

// @desc Get all users
// @route GET /users
// @access public
const getAllUsers = asyncHandler(async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean()

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
})




// @desc Create new user
// @route POST /users
// @access public
const createNewUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate email
    const duplicate = await User.findOne({ email }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'The email is already registered' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = { email, "password": hashedPwd }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ 
            message: `New user created with email  ${email} ` 
        })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Confirm data
    if (!email || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    //finding user by email

    const foundUser = await User.findOne({ email }).exec();

    
    if (!foundUser) {
        return res.status(401).json({ message: 'Unauthorized' })

    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) return res.status(401).json({ message: 'Unauthorized' });

    res.json(foundUser.email)


    
    
})



    module.exports = {
        getAllUsers,
        createNewUser,
        loginUser

    }

