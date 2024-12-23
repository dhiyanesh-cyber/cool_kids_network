import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'firstName lastName country email role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};



export const getUserProfile = async (req, res) => {
  const { email } = req.query;


  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Return full user details
    const { firstName, lastName, country, email: userEmail, role } = user;
    res.status(200).json({
      firstName,
      lastName,
      country,
      email: userEmail,
      role,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error: error.message });
  }
};

