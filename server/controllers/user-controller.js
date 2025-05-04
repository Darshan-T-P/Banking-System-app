import User from '../models/model.js';
import { plaidClient } from '../plaid/plaid.js';  // Import the plaid client


// Create Link Token (for Plaid Link)
export const createLinkToken = async (req, res) => {
    try {
        const { user } = req.body;  // Assuming user data is passed in the body

        const tokenParams = {
            user: {
                client_user_id: user._id,  // Assuming `user._id` is available
            },
            client_name: user.firstName + ' ' + user.lastName,
            products: ['auth'],
            language: 'en',
            country_codes: ['IN'], // India code, you can change based on your region
        };

        const response = await plaidClient.linkTokenCreate(tokenParams);
        res.status(200).json({ linkToken: response.data.link_token });
    } catch (error) {
        console.error("Error creating Plaid link token:", error);
        res.status(500).json({ message: 'Failed to create link token', error: error.message });
    }
};

// Exchange Public Token (for Plaid Link)
export const exchangePublicToken = async (req, res) => {
    try {
        const { publicToken, user } = req.body;  // publicToken and user are passed in the request

        const exchangeResponse = await plaidClient.itemPublicTokenExchange({ public_token: publicToken });

        // Optionally, store this item access information in the database for the user
        // For example, storing `access_token` in the User model

        user.plaidAccessToken = exchangeResponse.data.access_token;
        await user.save();

        res.status(200).json({ message: 'Public token exchanged successfully', accessToken: exchangeResponse.data.access_token });
    } catch (error) {
        console.error("Error exchanging public token:", error);
        res.status(500).json({ message: 'Failed to exchange public token', error: error.message });
    }
};

// Sign Up Controller
export const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, address, state, postalCode, dateOfBirth, ssn } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if SSN is already registered
        const existingSSN = await User.findOne({ ssn });
        if (existingSSN) {
            return res.status(400).json({ message: 'SSN already registered' });
        }

        // Create new user
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            address,
            state,
            postalCode,
            dateOfBirth,
            ssn
        });

        // Check if user is of legal age
        if (!user.isLegalAge()) {
            return res.status(400).json({ message: 'Must be 18 or older to create an account' });
        }

        // Save user
        await user.save();

        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
};

// Sign In Controller
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        if (password !== user.password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error signing in', error: error.message });
    }
};

// Update User Controller
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Don't allow password update through this route
        delete updates.password;

        const user = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true, runValidators: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};

// Delete User Controller
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

// Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: 'Error fetching user profile', error: error.message });
    }
};
