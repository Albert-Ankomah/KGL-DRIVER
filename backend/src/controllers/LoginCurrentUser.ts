// LoginCurrentUser.ts
// This file contains the controller for the login current user endpoint

import { Request, Response } from 'express'
const User = require('../models/user')
import bcrypt from 'bcryptjs'


const LoginCurrentUser = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body
    
    if (!phoneNumber || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ phoneNumber })
        
        if (!user) {
            return res.status(404).json({message: 'User not found, Please sign up'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({message: 'Invalid Credentials'})
        }

        res.status(200).json({ message: '✅ User logged in successfully', firstName: user.firstName })
    } catch (error: any) {
        console.error('❌ Error:', error)
        res.status(500).json({ message: '❌ An error occurred', error: error.message })
    }

}

module.exports = { LoginCurrentUser }