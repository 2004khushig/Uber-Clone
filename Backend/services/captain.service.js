const captainModel = require('../models/captain.model');

module.exports.registerCaptain = async ({
    firstname, lastname = "", email, password, color, plate, capacity, vehicleType
}) => {
    if (!firstname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const hashedPassword = await captainModel.hashPassword(password); // Hash the password here

    const captain = new captainModel({
        fullname: {
            firstname,
            lastname // this will be an empty string if no last name is provided
        },
        email,
        password: hashedPassword, // Use the hashed password here
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    await captain.save(); // Save the captain to the database

    return captain; // Return the captain object
};
