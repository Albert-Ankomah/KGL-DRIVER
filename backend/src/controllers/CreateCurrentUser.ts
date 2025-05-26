import { Request, Response } from "express"
import bcrypt from 'bcryptjs'
const User = require('../models/user')

const CreateCurrentUser = async (req: Request, res: Response) => {
  const { firstName, lastName, phoneNumber, password, confirmPassword } = req.body

    if (!firstName || !lastName || !phoneNumber || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        const existingUser = await User.findOne({ phoneNumber })
        if (existingUser) {
            res.status(400).json({message: 'Phone number already exists'})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            firstName,lastName,phoneNumber,password:hashedPassword, confirmPassword: hashedPassword 
            }
        )

        await newUser.save()
        res.status(201).json({ message: '✅ User registered successfully' });
    } catch (error: any) {
        console.error('❌ Error:', error);
        res.status(500).json({ message: '❌ Phone number already exists or an error occurred' });
    }
}

module.exports = { CreateCurrentUser }