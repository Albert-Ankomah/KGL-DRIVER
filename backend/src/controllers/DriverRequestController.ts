import { Request, Response } from 'express'
const DriverRequest = require('../models/driver') 


const DriverRequestController = async (req: Request, res: Response) => {
    const { firstName, surname, From, To, carBrand, carNumber } = req.body
    
    if(!firstName || !surname || !From || !To || !carBrand || !carNumber) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newRequest = new DriverRequest({
            firstName, surname, From, To, carBrand, carNumber
        })

        await newRequest.save()

        res.status(201).json({ message: '✅ Driver request created successfully' })
    } catch (error) {
        console.error('❌ Error:', error)
        res.status(500).json({ message: '❌ An error occurred' })
    }
}

module.exports = { DriverRequestController }
