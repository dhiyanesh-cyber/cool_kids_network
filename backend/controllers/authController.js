// backend/controllers/authController.js
import User from '../models/User.js';
import Maintainer from '../models/Maintainer.js';

export const signup = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate character details
    const characterDetails = await generateCharacter();

    // Create new user
    const newUser = new User({
      ...characterDetails,
      email,
      role: 'Cool Kid'
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        country: newUser.country,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the email belongs to a maintainer
    const maintainer = await Maintainer.findOne({ email });
    if (maintainer) {
      return res.status(200).json({
        message: 'Login successful',
        user: {
          email: maintainer.email,
          isMaintainer: true
        }
      });
    }

    // If not a maintainer, check the User collection
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with user details and isMaintainer flag
    res.status(200).json({
      message: 'Login successful',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        country: user.country,
        role: user.role,
        isMaintainer: false
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};