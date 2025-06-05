const Client = require("../../models/clientUser.model");

const editClientProfile = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            address,
            dateOfBirth,
            gender,
            id
        } = req.body;

        const updateData = {
            fullName,
            email,
            phone,
            resedentialAddress: [address],
            DateOfBirth: new Date(dateOfBirth),
            gender: gender.toLowerCase(),
            profilePhoto: "",
        };

        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            client: updatedClient
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            message: 'Error updating profile',
            error: error.message
        });
    }
};

const editClientServices = async (req, res) => {
    try {
        const {
            therapyServices,
            diagonosis,
            preferTherapy,
            profilePhoto,
            id
        } = req.body;

        const updateData = {
            therapyServices: therapyServices ? therapyServices.filter(service => service.selected)
                .map(service => service.name) : undefined,
            diagonosis,
            preferTherapy: preferTherapy ? [preferTherapy] : undefined,
            profilePhoto
        };

        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        const updatedClient = await Client.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedClient) {
            return res.status(404).json({ message: 'Client not found' });
        }

        res.status(200).json({
            message: 'Profile Services updated successfully',
            client: updatedClient
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({
            message: 'Error updating profile',
            error: error.message
        });
    }
};

const getClientProfile = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Client ID is required.' });
        }

        const client = await Client.findById(id);

        if (!client) {
            return res.status(404).json({ message: 'Client not found.' });
        }

        res.status(200).json({ success: true, data: client });
    } catch (error) {
        console.error('Error fetching client profile:', error);
        res.status(500).json({ success: false, message: 'Server error.' });
    }
};

module.exports = { editClientProfile, editClientServices,getClientProfile }