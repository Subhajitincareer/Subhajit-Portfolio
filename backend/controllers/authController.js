import User from '../models/User.js';
import imagekit from '../utils/imagekit.js';
import { generateToken } from '../utils/generateToken.js';
import asyncHandler from '../middlewares/asyncHandler.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Invalid user data'
    });
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.comparePassword(password))) {
    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    success: true,
    data: user
  });
});

// @desc    Get portfolio owner (admin) - Public
// @route   GET /api/auth/portfolio
// @access  Public
export const getPortfolioUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ role: 'admin' });
  if (!user) {
    return res.status(404).json({ success: false, message: 'Portfolio owner not found' });
  }
  res.json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Handle Profile Image Upload
  if (req.file) {
    try {
      const result = await new Promise((resolve, reject) => {
        imagekit.upload({
          file: req.file.buffer,
          fileName: `profile-${user._id}-${Date.now()}`,
          folder: '/portfolio/profiles'
        }, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });

      user.profileImage = {
        url: result.url,
        fileId: result.fileId
      };
    } catch (uploadError) {
      console.error('ImageKit Upload Error:', uploadError);
      return res.status(500).json({ success: false, message: 'Image upload failed' });
    }
  }

  // Update other fields
  if (req.body.name) user.name = req.body.name;
  if (req.body.tag) user.tag = req.body.tag;
  if (req.body.birthday) user.birthday = req.body.birthday;
  if (req.body.location) user.location = req.body.location;
  if (req.body.email && req.body.email !== user.email) user.email = req.body.email; // Only update if changed

  // Social Links
  if (req.body.github || req.body.linkedin || req.body.twitter) {
    user.socialLinks = {
      github: req.body.github || user.socialLinks?.github || '',
      linkedin: req.body.linkedin || user.socialLinks?.linkedin || '',
      twitter: req.body.twitter || user.socialLinks?.twitter || ''
    };
  }

  // About Section
  if (req.body.about) user.about = req.body.about;

  // About Cards
  if (req.body.aboutCards) {
    try {
      // If it comes as a string (FormData), parse it
      const cards = typeof req.body.aboutCards === 'string'
        ? JSON.parse(req.body.aboutCards)
        : req.body.aboutCards;
      user.aboutCards = cards;
    } catch (e) {
      console.error('Error parsing aboutCards:', e);
    }
  }

  try {
    await user.save();
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Email is already in use' });
    }
    throw error;
  }

  res.status(200).json({
    success: true,
    data: user
  });
});