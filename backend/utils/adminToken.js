import jwt from 'jsonwebtoken';

// Function to generate admin tokens
export const generateAdminToken = (adminId) => {
  return jwt.sign(
    { adminId }, 
    process.env.ADMIN_SECRET_KEY,
    { expiresIn: '30d' } // Token expires in 30 days
  );
};