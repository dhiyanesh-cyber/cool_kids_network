// controllers/adminController.js
import User from '../models/User.js';
import Maintainer from '../models/Maintainer.js'; // Import the Maintainer model

export const assignRole = async (req, res) => {
  try {
    const { maintainerId, identifier, identifierType, newRole } = req.body;

    if (!maintainerId || !identifier || !identifierType || !newRole) {
      return res.status(400).json({ message: 'Missing required fields' });  
    }

    // Check if the maintainer exists
    const maintainer = await Maintainer.findOne({ email: maintainerId });
    if (!maintainer) {
      return res.status(403).json({ message: 'Unauthorized maintainer' });
    }

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

export const createMaintainer = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email is already a maintainer
    const existingMaintainer = await Maintainer.findOne({ email });
    if (existingMaintainer) {
      return res.status(409).json({ message: 'Maintainer already exists' });
    }

    // Create a new maintainer
    const newMaintainer = new Maintainer({ email });
    await newMaintainer.save();

    res.status(201).json({ message: 'Maintainer created successfully' });
  } catch (error) {
    console.error('Error creating maintainer:', error);
    res.status(500).json({ message: 'Error creating maintainer', error: error.message });
  }
};