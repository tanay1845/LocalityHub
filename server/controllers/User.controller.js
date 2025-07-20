import User from '../models/User.model.js';
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, password, email, mobile, state, city } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const newUser = new User({
      username,
      password,
      email,
      mobile,
      state,
      city,
    });

    await newUser.save();

    // optional: auto-login after signup
    const token = generateToken(newUser._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      })
      .status(201)
      .json({
        message: 'User registered successfully',
        user: {
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
        },
      });

  } catch (error) {
    return res.status(500).json({ message: 'Signup failed', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.isPasswordMatch(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      })
      .status(200)
      .json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });

  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const logoutUser = (req, res) => {
  try {
    return res.clearCookie('token').json({ message: 'Logged out' });
  } catch (error) {
    return res.status(500).json({ 
      message: 'Login failed', error: error.message
    });
  }
};


export const getUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error retrieving user", error: error.message });
  }
};


export const getUserProfile = async (req, res) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user data
    return res.status(200).json(user);

  } catch (error) {
    console.error("getUserProfile error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
