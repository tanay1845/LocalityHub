import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({})

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "10d" } // 10 days
  );
};

export default generateToken;
