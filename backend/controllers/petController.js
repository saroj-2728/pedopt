const Pet = require('../models/Pet');
const cloudinary = require('cloudinary').v2;

const savePet = async (req, res) => {
    const { ownerName, phoneNumber, breed, age, gender, type, description } = req.body;
    const petImage = req.file;

    if (!ownerName || !phoneNumber || !breed || !age || !gender || !type || !description) {
        return res.status(400).json({
            success: false,
            error: 'Invalid input! Please fill out all the fields'
        });
    }

    if (!petImage) {
        return res.status(400).json({
            success: false,
            error: 'Pet image is required'
        });
    }

    try {
        const uploadPromise = new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: 'pedopt_pet_images',
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            stream.end(petImage.buffer);
        });

        const uploadedImage = await uploadPromise;

        req.body.petImage = uploadedImage.secure_url;

        await Pet.create(req.body);

        res.status(201).json({
            success: true,
            message: 'Pet offered for adoption successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to save pet. Please try again!'
        });
    }
}

const adoptPet = async (req, res) => {
    const { petId } = req.params;

    if (!petId) {
        return res.status(400).json({
            success: false,
            error: 'Invalid input! Please provide the petId'
        });
    }

    try {
        const pet = await Pet.findByPk(petId);
        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'Pet not found'
            });
        }

        if (pet.status === 'adopted') {
            return res.status(400).json({
                success: false,
                error: 'Pet already adopted'
            });
        }

        pet.status = "adopted";
        await pet.save();

        res.status(200).json({
            success: true,
            message: 'Pet adopted successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to adopt pet. Please try again!'
        });
    }
}

const getAvailablePets = async (req, res) => {
    try {
        const pets = await Pet.findAll({
            where: {
                status: 'upForAdoption'
            }
        });
        res.status(200).json({
            success: true,
            pets
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to get available pets. Please try again!'
        });
    }
}

const getPetsByUser = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({
            success: false,
            error: 'Invalid input! Please provide the userId'
        });
    }

    try {
        const pets = await Pet.findAll({
            where: {
                userId
            }
        });

        res.status(200).json({
            success: true,
            pets
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to get pets. Please try again!'
        });
    }
}

const deletePet = async (req, res) => {
    const { petId } = req.params;

    if (!petId) {
        return res.status(400).json({
            success: false,
            error: 'Invalid input! Please provide the petId'
        });
    }

    try {
        const pet = await Pet.findByPk(petId);
        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'Pet not found'
            });
        }

        await pet.destroy();

        res.status(200).json({
            success: true,
            message: 'Pet deleted successfully'
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Failed to delete pet. Please try again!'
        });
    }
}

const updatePet = async (req, res) => {
    const { petId } = req.params;
    const { ownerName, phoneNumber, breed, age, gender, type, description } = req.body;
    const petImage = req.file;

    if (!ownerName || !phoneNumber || !breed || !age || !gender || !type || !description) {
        return res.status(400).json({
            success: false,
            error: 'Invalid input! Please fill out all the fields'
        });
    }

    if (!petImage) {
        return res.status(400).json({
            success: false,
            error: 'Pet image is required'
        });
    }

    try {
        const pet = await Pet.findByPk(petId);

        if (!pet) {
            return res.status(404).json({
                success: false,
                error: 'Pet not found'
            });
        }

        if (petImage) {
            const uploadPromise = new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: 'real_state_property_images',
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                stream.end(propertyImage.buffer);
            });

            const uploadedImage = await uploadPromise;
            req.body.petImage = uploadedImage.secure_url;
        }

        Object.assign(pet, req.body);
        await pet.save();

        res.status(200).json({
            success: true,
            message: 'Pet details updated successfully',
            property
        });
    }
    catch (error) {
        console.error('Pet updation error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to update pet details. Please try again!'
        });
    }
};

module.exports = {
    savePet,
    adoptPet,
    getAvailablePets,
    getPetsByUser,
    deletePet,
    updatePet
};