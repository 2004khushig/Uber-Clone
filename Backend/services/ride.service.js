const Ride = require('../models/ride.model'); // Ensure correct import
const mapService = require('./maps.service');
const crypto = require('crypto');

/**
 * Function to calculate fare for all vehicle types
 * @param {string} pickup - Pickup location
 * @param {string} destination - Destination location
 * @returns {object} Fares for auto, car, and moto
 */
async function getFare(pickup, destination) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);

    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Invalid distance or duration data');
    }

    const baseFare = { auto: 30, car: 50, moto: 20 };
    const perKmRate = { auto: 10, car: 15, moto: 8 };
    const perMinuteRate = { auto: 2, car: 3, moto: 1.5 };

    return { 
        auto: baseFare.auto + (distanceTime.distance.value / 1000) * perKmRate.auto +
              (distanceTime.duration.value / 60) * perMinuteRate.auto,
        car: baseFare.car + (distanceTime.distance.value / 1000) * perKmRate.car +
             (distanceTime.duration.value / 60) * perMinuteRate.car,
        moto: baseFare.moto + (distanceTime.distance.value / 1000) * perKmRate.moto +
              (distanceTime.duration.value / 60) * perMinuteRate.moto
    };
}

/**
 * Function to generate a random OTP
 * @param {number} num - Number of OTP digits
 * @returns {string} OTP code
 */
async function getOtp(num) {
    return crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
}

/**
 * Function to create a new ride
 * @param {object} rideData - Contains user, pickup, destination, and vehicleType
 * @returns {object} Ride object with fare and OTP
 */
module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fares = await getFare(pickup, destination); // Get fare for all vehicles
    const otp = await getOtp(6);

    if (!fares[vehicleType]) {
        throw new Error('Invalid vehicle type');
    }

    const ride = await Ride.create({
        user,
        pickup,
        destination,
        vehicleType,
        otp,
        fare: fares[vehicleType] // Correctly accessing the selected vehicle type's fare
    });

    return ride;
};

module.exports.confirmRide = async ({
    rideId,
    
})=>{
    if(!rideId){
        throw new Error('Ride ID is required');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,

    },{
        status: 'accepted',
        captain: captain._id,
    });
    const ride = await rideModel.findOne({
        _id: rideId,
    }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
    return ride;
}
module.exports.getFare = getFare;

module.exports.startRide = async ({ rideId, otp,captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
        
    }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.otp!==otp){
        throw new Error('Invalid OTP');
    }
    if(ride.status!=='accepted'){
        throw new Error('Ride not confirmed');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,
    },{
        status: 'started',
    })
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride,
    });
    return ride;
};
module.exports.endRide = async ({ rideId }) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
        cap
    }).populate('user').populate('captain').select('+otp');
    if(!ride){
        throw new Error('Ride not found');
    }
    if(ride.status!=='started'){
        throw new Error('Ride not started');
    }
    await rideModel.findOneAndUpdate({
        _id: rideId,
    },{
        status: 'completed',
    })
    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-completed',
        data: ride,
    });
    return ride;
}



