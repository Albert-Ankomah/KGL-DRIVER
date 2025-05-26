import mongoose from "mongoose";

const driverRequestSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    surname: { type: String, required: true, trim: true },
    From: { type: String, required: true, trim: true },
    To: { type: String, required: true, trim: true },
    carBrand: { type: String, required: true, trim: true },
    carNumber: { type: String, required: true, trim: true }
}, { timestamps: true })


const DriverRequest = mongoose.model('DriverRequest', driverRequestSchema)

module.exports = DriverRequest