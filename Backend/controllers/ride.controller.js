const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const {sendMessageToSocketId} = require('../socket');
const rideModel = require('../models/ride.model');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;
    const user = req.user_id;  

    if (!user || !pickup || !destination || !vehicleType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const ride = await rideService.createRide({ user, pickup, destination, vehicleType });

        // ✅ Move sending response here
        res.status(201).json(ride);

        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsInRadius = await mapService.getCaptainInTheRadius(pickupCoordinates.lat, pickupCoordinates.lng, 15);

        ride.otp = "";  
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate("user");

        console.log("🟢 Ride Details Being Sent:", rideWithUser);

        for (const captain of captainsInRadius) {
            console.log("🟠 Sending ride to captain:", captain.socketId);

            sendMessageToSocketId(captain.socketId, {
                event: "new-ride",
                data: rideWithUser
            });
        }
    } catch (error) {
        console.error("🔴 Error in createRide:", error);
        if (!res.headersSent) {
            return res.status(500).json({ message: error.message });
        }
    }
};


module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    if (!pickup || !destination) {
        return res.status(400).json({ message: "Pickup and destination are required" });
    }

    try {
        // Get fares for all three vehicle types
        const fareDetails = {
            auto: await rideService.getFare(pickup, destination, "auto"),
            car: await rideService.getFare(pickup, destination, "car"),
            moto: await rideService.getFare(pickup, destination, "moto")
        };

        return res.status(200).json({ fares: fareDetails });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    const captain = req.user_id;

    if (!rideId) {
        return res.status(400).json({ message: "Ride ID is required" });
    }

    try {
        const ride = await rideService.confirmRide(rideId, captain);
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        });

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.query;
    const captain = req.user_id;

    if (!rideId || !otp) {
        return res.status(400).json({ message: "Ride ID and OTP are required" });
    }

    try {
        const ride = await rideService.startRide(rideId, captain, otp);

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;
    const captain = req.user_id;

    if (!rideId) {
        return res.status(400).json({ message: "Ride ID is required" });
    }

    try {
        const ride = await rideService.endRide(rideId, captain);
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-ended",
            data: ride
        });

        if (!ride) {
            return res.status(404).json({ message: "Ride not found" });
        }

        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}   