// controllers/adminController.js
import User from '../models/User.js';
import { generateAdminToken } from '../utils/adminToken.js';

export const assignRole = async (req, res) => {
  try {
    const { identifier, identifierType, newRole } = req.body;

    // Validate role
    const validRoles = ['Cool Kid', 'Cooler Kid', 'Coolest Kid'];
    if (!validRoles.includes(newRole)) {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    let user;

    // Find user based on identifier type
    if (identifierType === 'email') {
      user = await User.findOne({ email: identifier });
    } else if (identifierType === 'name') {
      const [firstName, lastName] = identifier.split(' ');
      user = await User.findOne({ firstName, lastName });
    } else {
      return res.status(400).json({ message: 'Invalid identifier type' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user role
    user.role = newRole;
    await user.save();

    // Log the role change
    console.log(`Role updated for user ${user.email} to ${newRole}`);

    res.status(200).json({
      message: 'Role updated successfully',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error in assignRole:', error);
    res.status(500).json({ message: 'Error updating role', error: error.message });
  }
};

export const generateToken = async (req, res) => {
  try {
    // In a real app, you'd want to validate the request
    // For this proof of concept, we'll generate a token for testing
    const adminId = 'admin123'; // You could make this dynamic
    const token = generateAdminToken(adminId);

    res.json({
      message: 'Admin token generated successfully',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating token', error: error.message });
  }
};